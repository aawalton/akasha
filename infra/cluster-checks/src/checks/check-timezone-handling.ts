#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import ts from "typescript"
import { CHECK_EXEMPT_DIRS } from "../../../../repo/scope/scope.ts"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args.ts"
import { examineFilePopulation } from "../../../../tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root.ts"
import {
  type NormalizedFinding,
  type SyntaxScannerEntry,
  scriptKindFor,
} from "../lib/syntax-scanner-entry.ts"
import {
  scanTimezoneViolations,
  type TimezoneRule,
  type TimezoneViolation,
} from "../lib/ts-timezone-violations.ts"
import { listTsFiles } from "../lib/ts-file-iteration.ts"
import { exitOnResult } from "../../../../tools/lib/check-workflow/violation-reporter"
const PREFIX = "[timezone-handling]"

const TIMEZONE_SUCCESS_MESSAGE =
  "No timezone-handling violations in the TypeScript this gate reads. Hour-offset arithmetic is judged only inside the ESO zone-domain paths, and formula strings on pages rows are read by nothing — see this check's header."

const ALLOWLISTED_HELPERS: ReadonlySet<string> = new Set([
  "day/day.ts",
  "tools/lib/tracking/mountain-times.ts",
  "temper/player-completion-addon/src/tracking/daily-writs.ts",
  "temper/shared-foundation-misc-dungeons/src/eso-day.ts",
])

const ESO_DOMAIN_PREFIXES: readonly string[] = [
  "shared/recurrence/",
  "shared/tasks/",
  "temper/",
]

function isExcluded(rel: string): boolean {
  if (rel.endsWith(".d.ts")) return true
  if (rel.endsWith(".generated.ts") || rel.endsWith(".generated.tsx")) return true
  if (rel.split("/").some((p) => CHECK_EXEMPT_DIRS.has(p))) return true
  if (rel.includes("/dist/")) return true
  if (rel.includes("/node_modules/")) return true
  return false
}

function isInEsoDomain(rel: string): boolean {
  return ESO_DOMAIN_PREFIXES.some((p) => rel.startsWith(p))
}

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

const REMEDY_BY_RULE: Record<TimezoneRule, string> = {
  "t00-parse":
    "derive the instant through a canonical zone-day helper, rather than concatenating a `T00:00…` suffix and letting `new Date` read it in browser-local time",
  "hour-offset-constant":
    "take the offset from a canonical zone-day helper rather than multiplying hours to milliseconds, which drifts by an hour at each DST transition — a whole-day duration is not flagged and needs no change",
  "iana-zone-literal": `import the zone from a canonical helper module: ${[...ALLOWLISTED_HELPERS].join(", ")} are where a zone literal may stand`,
  "utc-day-slice":
    "route the day cut through a canonical zone-day helper, or name the receiving binding with a `Utc` marker to declare that the value really is a UTC bucket",
}

function messageOf(v: TimezoneViolation): string {
  return `${v.rule} — ${v.snippet} — ${REMEDY_BY_RULE[v.rule]}`
}

function formatViolation(v: TimezoneViolation): string {
  return `${v.file}:${v.line}:${v.column} ${messageOf(v)}`
}

export const timezoneHandlingEntry: SyntaxScannerEntry = {
  name: "timezone-handling",
  preFileSkip: (rel) => isExcluded(rel) || ALLOWLISTED_HELPERS.has(rel),
  findFindings: (sf) => {
    const out: NormalizedFinding[] = []
    for (const f of scanTimezoneViolations(sf, !isInEsoDomain(sf.fileName))) {
      out.push({
        file: f.file,
        line: f.line,
        column: f.column,
        message: messageOf(f),
        groupKey: topLevelGroup(f.file),
      })
    }
    return out
  },
  successMessage: TIMEZONE_SUCCESS_MESSAGE,
}

async function main(): Promise<undefined> {
  let flags: {
    json: boolean
    repoRoot: string | undefined
    treeSha: string | undefined
    cacheDir: string | undefined
  }
  try {
    const parsed = parseArgs(
      process.argv.slice(2),
      { ...STANDARD_FLAGS, treeSha: { kind: "string" }, cacheDir: { kind: "string" } },
      { passthrough: true }
    )
    flags = {
      json: parsed.flags.json,
      repoRoot: parsed.flags.repoRoot,
      treeSha: parsed.flags.treeSha,
      cacheDir: parsed.flags.cacheDir,
    }
  } catch (err) {
    process.stderr.write(`${PREFIX} ${err instanceof Error ? err.message : String(err)}\n`)
    process.exit(2)
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    process.stderr.write(`${PREFIX} --repo-root ${repoRoot} does not exist\n`)
    process.exit(2)
  }

  const tsFiles = await listTsFiles({
    repoRoot,
    treeSha: flags.treeSha,
    cacheDir: flags.cacheDir,
  })
  const files = [...tsFiles].sort()

  const { population, violations: findings } = examineFilePopulation<TimezoneViolation>({
    files: files.filter((rel) => !isExcluded(rel) && !ALLOWLISTED_HELPERS.has(rel)),
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "`files` is the TS-file enumeration of the graph `listTsFiles` " +
        "awaited above, and a build that fails rejects out of `main` rather than handing back " +
        "a partial graph, so fewer nodes means fewer TS files on disk",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, source) =>
      scanTimezoneViolations(
        ts.createSourceFile(rel, source, ts.ScriptTarget.Latest, true, scriptKindFor(rel)),
        !isInEsoDomain(rel)
      ),
  })

  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `Timezone-handling violations — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
      successMessage: TIMEZONE_SUCCESS_MESSAGE,
      groupBy: (v) => topLevelGroup(v.file),
      formatViolation,
    },
  })
}

if (import.meta.main) {
  main().catch((err) => {
    console.error(`${PREFIX} Unexpected error:`, err)
    process.exit(2)
  })
}
