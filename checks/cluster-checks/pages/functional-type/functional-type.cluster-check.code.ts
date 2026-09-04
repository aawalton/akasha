#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { listWorkspaceDirs } from "@akasha/workspace-paths/workspace-dirs"
import { z } from "zod"
import { parseArgs as parseCliArgs } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  type FunctionalType,
  readFunctionalType,
  workspacePackageJsonPath,
} from "../../modules/functional-type/functional-type.module.code.ts"
import {
  type FixpointWorkspace,
  runFunctionalTypeFixpoint,
} from "../../modules/functional-type-fixpoint/functional-type-fixpoint.module.code.ts"
import {
  ACT_BY_KIND,
  type Finding,
  findFunctionalTypeViolations,
  type WorkspaceTypeRead,
} from "../../modules/functional-type-rules/functional-type-rules.module.code.ts"
import {
  examinePopulation,
  type Population,
} from "../../modules/population/population.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
  type Violation,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[check-functional-type]"

const STRING_RECORD_SCHEMA = z.record(z.string(), z.string())

const PACKAGE_JSON_DEPS_SCHEMA = z
  .object({
    name: z.string().optional(),
    bin: z.unknown().optional(),
    dependencies: STRING_RECORD_SCHEMA.optional(),
    peerDependencies: STRING_RECORD_SCHEMA.optional(),
    devDependencies: STRING_RECORD_SCHEMA.optional(),
    optionalDependencies: STRING_RECORD_SCHEMA.optional(),
  })
  .passthrough()

type PackageJsonWithName = z.infer<typeof PACKAGE_JSON_DEPS_SCHEMA>

interface CliArgs {
  jsonOutput: boolean
  repoRoot: string
}

const FLAG_SPEC = {
  json: { kind: "boolean" },
  repoRoot: { kind: "string" },
} as const

function parseArgs(): CliArgs {
  let parsed: ReturnType<typeof parseCliArgs<typeof FLAG_SPEC>>
  try {
    parsed = parseCliArgs(process.argv.slice(2), FLAG_SPEC)
  } catch (err) {
    const msg = errorMessage(err).replace(/^Unknown flag: /, "unknown argument: ")
    throw new Error(msg)
  }
  if (parsed.positionals.length > 0) {
    throw new Error(`unknown argument: ${parsed.positionals[0]}`)
  }
  return {
    jsonOutput: parsed.flags.json,
    repoRoot: parsed.flags.repoRoot != null ? resolve(parsed.flags.repoRoot) : getRepoRoot(),
  }
}

function loadWorkspacePaths(repoRoot: string): readonly string[] {
  return listWorkspaceDirs(repoRoot)
}

function readPackageDeps(packageJsonPath: string): PackageJsonWithName | null {
  if (!existsSync(packageJsonPath)) return null
  const source = readFileSync(packageJsonPath, "utf-8")
  try {
    return PACKAGE_JSON_DEPS_SCHEMA.parse(JSON.parse(source))
  } catch {
    return null
  }
}

interface WorkspaceFacts {
  readonly fixpointWorkspaces: readonly FixpointWorkspace[]
  readonly typeReadsByPath: ReadonlyMap<string, ReturnType<typeof readFunctionalType>>
  readonly population: Population
}

function readWorkspaceFacts(repoRoot: string, paths: readonly string[]): WorkspaceFacts {
  const fixpointWorkspaces: FixpointWorkspace[] = []
  const typeReadsByPath = new Map<string, ReturnType<typeof readFunctionalType>>()
  const { population } = examinePopulation<string, never>({
    members: paths,
    unit: "workspaces",
    membership: {
      kind: "enumerated",
      because:
        "`paths` is `listWorkspaceDirs`' output handed over whole with nothing filtered off it, and that function throws on a root `package.json` it cannot read or a `workspaces` glob shape it does not support, so the members here are the declared workspace set itself",
    },
    labelOf: (path) => path,
    siteOf: (path) => workspacePackageJsonPath(repoRoot, path),
    examine: (path) => {
      const pkgPath = workspacePackageJsonPath(repoRoot, path)
      const result = readFunctionalType(pkgPath)
      typeReadsByPath.set(path, result)
      const pkg = readPackageDeps(pkgPath)
      if (pkg !== null) {
        fixpointWorkspaces.push({
          path,
          name: pkg.name,
          pkg,
          workspaceDir: resolve(repoRoot, path),
          declared: result.type,
        })
      }
      return []
    },
  })
  return { fixpointWorkspaces, typeReadsByPath, population }
}

function loadWorkspaceReads(
  repoRoot: string,
  paths: readonly string[]
): { readonly reads: readonly WorkspaceTypeRead[]; readonly population: Population } {
  const { fixpointWorkspaces, typeReadsByPath, population } = readWorkspaceFacts(repoRoot, paths)
  const { inferredByPath, unclassifiedPaths } = runFunctionalTypeFixpoint(fixpointWorkspaces)
  const reads: WorkspaceTypeRead[] = []
  for (const path of paths) {
    const result = typeReadsByPath.get(path) ?? { type: null, raw: undefined }
    const inferred: FunctionalType | null = inferredByPath.get(path) ?? null
    reads.push({ path, result, inferred, unclassifiable: unclassifiedPaths.has(path) })
  }
  return { reads, population }
}

function formatFinding(f: Finding): string {
  switch (f.kind) {
    case "MissingFunctionalType":
      return f.path
    case "InvalidFunctionalType":
      return `${f.path}  (raw: ${f.raw})`
    case "MismatchedFunctionalType":
      return `${f.path}  (declared: ${f.declared}, inferred: ${f.inferred})`
    case "UnclassifiableWorkspace":
      return `${f.path}  (declared: ${f.declared ?? "none"}, inferred: no discriminator row matched)`
    default:
      return assertNever(f)
  }
}

async function main(): Promise<never> {
  let args: CliArgs
  try {
    args = parseArgs()
  } catch (err) {
    return exitOnToolError({ error: err, prefix: PREFIX })
  }

  const paths = loadWorkspacePaths(args.repoRoot)
  const { reads, population } = loadWorkspaceReads(args.repoRoot, paths)
  const findings = findFunctionalTypeViolations(reads)

  const counts: Record<Finding["kind"], number> = {
    MissingFunctionalType: 0,
    InvalidFunctionalType: 0,
    MismatchedFunctionalType: 0,
    UnclassifiableWorkspace: 0,
  }
  for (const f of findings) counts[f.kind]++

  return exitOnResult<Finding & Violation>({
    violations: findings,
    options: {
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header: "functionalType finding(s)",
      successMessage: `OK — ${paths.length} workspace(s) all declare a valid functionalType matching the discriminator chain`,
      population,
      groupBy: (f) => `${f.kind} (${counts[f.kind]}) — ${ACT_BY_KIND[f.kind]}`,
      formatViolation: formatFinding,
    },
  })
}

main().catch((err: unknown) => {
  exitOnToolError({ error: err, prefix: PREFIX })
})
