#!/usr/bin/env bun

import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { isSynthPath } from "@infra/k8s-synth/manifests"
import { z } from "zod"
import { parseArgs as parseCliArgs } from "../../../../../infra/cluster-checks/src/lib/cli-args.ts"
import { getRepoRoot } from "../../../../../infra/cluster-checks/src/lib/repo-root.ts"
import { refuseRetired } from "../../../../../infra/cluster-checks/src/lib/retired.ts"
import {
  detectsBunRunStartCommand,
  findStartScriptViolations,
  resolveOwningWorkspace,
  type StartContainerSite,
  type StartScriptFinding,
} from "../../../../../infra/cluster-checks/src/lib/start-script-rules.ts"
import {
  examineFilePopulation,
  type Population,
} from "../../../../../tools/lib/check-workflow/population"
import {
  computeExitCode,
  exitOnResult,
  exitOnToolError,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import { listWorkspaceDirs } from "../../../../../tools/lib/check-workflow/workspace-paths"

if (import.meta.main) refuseRetired()

const PREFIX = "[check-start-script]"

const PACKAGE_JSON_SCRIPTS_SCHEMA = z
  .object({ scripts: z.record(z.string(), z.string()).optional() })
  .passthrough()

interface CliArgs {
  jsonOutput: boolean
  repoRoot: string
}

const FLAG_SPEC = {
  json: { kind: "boolean" },
  repoRoot: { kind: "string" },
} as const

const PACKAGES_DIRNAME = "packages"
const SKIP_DIRS: ReadonlySet<string> = new Set(["node_modules", "dist", ".git", "generated"])

function parseArgs(): CliArgs {
  let parsed: ReturnType<typeof parseCliArgs<typeof FLAG_SPEC>>
  try {
    parsed = parseCliArgs(process.argv.slice(2), FLAG_SPEC)
  } catch (err) {
    const msg = errorMessage(err).replace(/^Unknown flag: /, "unknown argument: ")
    return exitOnToolError({ error: new Error(msg), prefix: PREFIX })
  }
  if (parsed.positionals.length > 0) {
    return exitOnToolError({
      error: new Error(`unknown argument: ${parsed.positionals[0]}`),
      prefix: PREFIX,
    })
  }
  return {
    jsonOutput: parsed.flags.json,
    repoRoot: parsed.flags.repoRoot != null ? resolve(parsed.flags.repoRoot) : getRepoRoot(),
  }
}

function collectK8sSynthFiles(repoRoot: string): readonly string[] {
  const out: string[] = []
  const packagesAbs = resolve(repoRoot, PACKAGES_DIRNAME)
  if (!existsSync(packagesAbs)) return out
  const walk = (dirAbs: string): undefined => {
    for (const entry of readdirSync(dirAbs, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) continue
        walk(join(dirAbs, entry.name))
      } else if (entry.isFile() && entry.name === "synth.ts") {
        const rel = relative(repoRoot, join(dirAbs, entry.name)).split("\\").join("/")
        if (isSynthPath(rel)) out.push(rel)
      }
    }
  }
  walk(packagesAbs)
  return out.sort()
}

function workspaceHasStartScript(repoRoot: string, workspaceDir: string): boolean {
  const pkgPath = resolve(repoRoot, workspaceDir, "package.json")
  if (!existsSync(pkgPath)) return false
  const raw = readFileSync(pkgPath, "utf-8")
  try {
    const pkg = PACKAGE_JSON_SCRIPTS_SCHEMA.parse(JSON.parse(raw))
    const start = pkg.scripts?.start
    return typeof start === "string" && start.trim() !== ""
  } catch {
    return false
  }
}

function loadStartContainerSites(repoRoot: string): {
  readonly sites: readonly StartContainerSite[]
  readonly population: Population
} {
  const workspaceDirs = listWorkspaceDirs(repoRoot)
  const sites: StartContainerSite[] = []
  const { population } = examineFilePopulation({
    files: collectK8sSynthFiles(repoRoot),
    unit: "k8s synth files",
    membership: {
      kind: "enumerated",
      because:
        "the walk is `readdirSync`, which raises rather than skipping a directory it " +
        "cannot list; its one `existsSync` guard is on `<repoRoot>/packages` itself and " +
        "returns the empty list, which the empty-population arm refuses rather than " +
        "certifying — so fewer members means fewer files on disk that the shared " +
        "synth discovery rule matches",
    },
    pathOf: (p) => resolve(repoRoot, p),
    scan: (synthPath, text) => {
      if (!detectsBunRunStartCommand(text)) return []
      const owningWorkspace = resolveOwningWorkspace(synthPath, workspaceDirs)
      const hasStartScript =
        owningWorkspace !== null && workspaceHasStartScript(repoRoot, owningWorkspace)
      sites.push({ synthPath, owningWorkspace, hasStartScript })
      return []
    },
  })
  return { sites, population }
}

interface StartScriptViolation {
  readonly message: string
  readonly kind: StartScriptFinding["kind"]
  readonly synthPath: string
}

function toViolation(f: StartScriptFinding): StartScriptViolation {
  const message =
    f.kind === "MissingStartScript"
      ? `${f.synthPath} runs \`bun run start\` but ${f.workspace}/package.json has no non-empty scripts.start`
      : `${f.synthPath} declares a \`bun run start\` container outside any workspace`
  return { message, kind: f.kind, synthPath: f.synthPath }
}

function formatJson(findings: readonly StartScriptFinding[]): undefined {
  for (const f of findings) {
    process.stdout.write(`${JSON.stringify(f)}\n`)
  }
}

async function main(): Promise<never> {
  const args = parseArgs()
  const { sites, population } = loadStartContainerSites(args.repoRoot)
  const findings = findStartScriptViolations(sites)

  if (args.jsonOutput) {
    formatJson(findings)
    process.exit(computeExitCode({ violationCount: findings.length, population }))
  }

  const kindCounts = new Map<string, number>()
  for (const f of findings) kindCounts.set(f.kind, (kindCounts.get(f.kind) ?? 0) + 1)

  return exitOnResult<StartScriptViolation>({
    violations: findings.map(toViolation),
    options: {
      prefix: PREFIX,
      header:
        "`bun run start` container(s) with a missing start script or an unresolved owning workspace",
      successMessage: `OK — ${sites.length} \`bun run start\` container(s) all have a non-empty scripts.start`,
      population,
      groupBy: (v) => `${v.kind} (${kindCounts.get(v.kind)})`,
      formatViolation: (v) => v.message,
    },
  })
}

main().catch((err) => {
  exitOnToolError({ error: err, prefix: PREFIX })
})
