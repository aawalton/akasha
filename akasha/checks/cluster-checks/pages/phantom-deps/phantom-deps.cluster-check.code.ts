#!/usr/bin/env bun

import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import {
  loadWorkspaces,
  type WorkspaceData,
  type WorkspaceGraph,
} from "../../../../../infra/cluster-checks/src/checks/check-phantom-deps-graph.ts"
import type { PhantomDepViolation } from "../../../../../infra/cluster-checks/src/checks/check-phantom-deps-json-contract.ts"
import { parseArgs as parseCliArgs } from "../../../../../infra/cluster-checks/src/lib/cli-args.ts"
import { refuseRetired } from "../../../../../infra/cluster-checks/src/lib/retired.ts"
import {
  examinePopulation,
  type Population,
} from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  exitOnToolError,
} from "../../../../../tools/lib/check-workflow/violation-reporter"

if (import.meta.main) refuseRetired()

const PREFIX = "[phantom-deps]"

interface CliArgs {
  readonly jsonOutput: boolean
  readonly treeSha: string
}

const FLAG_SPEC = {
  json: { kind: "boolean" },
  treeSha: { kind: "string", required: true },
} as const

function parseArgs(): CliArgs {
  let parsed: ReturnType<typeof parseCliArgs<typeof FLAG_SPEC>>
  try {
    parsed = parseCliArgs(process.argv.slice(2), FLAG_SPEC)
  } catch (err) {
    const msg = errorMessage(err).replace(/^Unknown flag: /, "unknown argument: ")
    exitOnToolError({ error: msg, prefix: PREFIX })
  }
  if (parsed.positionals.length > 0) {
    exitOnToolError({ error: `unknown argument: ${parsed.positionals[0]}`, prefix: PREFIX })
  }
  return { jsonOutput: parsed.flags.json, treeSha: parsed.flags.treeSha }
}

function violationsFor(
  ws: WorkspaceData,
  workspaceNames: ReadonlySet<string>
): readonly PhantomDepViolation[] {
  const violations: PhantomDepViolation[] = []
  for (const [pkgName, info] of ws.importedPackages) {
    const isWorkspacePackage = workspaceNames.has(pkgName)

    if (isWorkspacePackage) {
      if (ws.declared.imageFollowed.has(pkgName)) continue
    } else {
      if (ws.declared.sites.has(pkgName)) continue

      if (info.typeOnly) {
        const typesName = pkgName.startsWith("@")
          ? `@types/${pkgName.slice(1).replace("/", "__")}`
          : `@types/${pkgName}`
        if (ws.declared.sites.has(typesName)) continue
      }
    }

    violations.push({
      workspace: ws.name,
      importedPackage: pkgName,
      file: info.example,
      imported: isWorkspacePackage ? "workspace" : "external",
      declaredAs: [...(ws.declared.sites.get(pkgName) ?? [])],
    })
  }
  return violations
}

function describeViolation(v: PhantomDepViolation): string {
  const head =
    v.declaredAs.length > 0
      ? `imports "${v.importedPackage}", declared only as ${v.declaredAs.join(", ")} — the builder image copies workspace source for a dep the closure follows, and it does not follow that`
      : `imports "${v.importedPackage}" but doesn't declare it in package.json`
  return `${head}\n      example: ${v.file}`
}

function remediationFooter(count: number): string {
  return (
    `${PREFIX} ${count} violation(s) found — declare the package in the importing workspace's package.json ` +
    `(a workspace package under dependencies or devDependencies at "workspace:*", the form the image build's ` +
    `COPY closure follows) AND run \`bun install\`, which is what writes the edge into bun.lock: ` +
    `without it \`bun install --frozen-lockfile\` reports no changes and exits 0 on a lockfile that never recorded the dependency.`
  )
}

function examineWorkspaces(
  repoRoot: string,
  graph: WorkspaceGraph
): { readonly population: Population; readonly violations: readonly PhantomDepViolation[] } {
  return examinePopulation<WorkspaceData, PhantomDepViolation>({
    members: graph.workspaces,
    unit: "workspaces",
    membership: {
      kind: "atLeast",
      members: graph.leastWorkspaces,
      from: graph.leastFrom,
    },
    labelOf: (ws) => ws.name,
    siteOf: (ws) => resolve(repoRoot, ws.path, "package.json"),
    examine: (ws) => violationsFor(ws, graph.workspaceNames),
  })
}

async function main(): Promise<void> {
  const args = parseArgs()
  const repoRoot = codeRoot()
  let graph: WorkspaceGraph
  try {
    graph = await loadWorkspaces({ repoRoot, treeSha: args.treeSha })
  } catch (err) {
    exitOnToolError({
      error: `failed to load the workspace graph: ${errorMessage(err)}`,
      prefix: PREFIX,
    })
  }
  const { population, violations } = examineWorkspaces(repoRoot, graph)
  exitOnResult({
    violations,
    options: {
      population,
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header: "Phantom dependency violations",
      successMessage: "No phantom dependencies found in the `.ts` sources of these workspaces.",
      groupBy: (v) => v.workspace,
      formatViolation: describeViolation,
      footer: remediationFooter,
    },
  })
}

main().catch((err: unknown) => exitOnToolError({ error: err, prefix: PREFIX }))
