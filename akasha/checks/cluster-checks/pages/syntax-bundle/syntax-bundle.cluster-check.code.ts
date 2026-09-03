#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import ts from "typescript"
import { examinePopulation } from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  exitOnToolError,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import {
  describeClosure,
  resolveChangeClosure,
} from "../../modules/change-closure/change-closure.module.code.ts"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import { SYNTAX_SCANNER_ENTRIES as ENTRIES } from "../../modules/scanner-registry/scanner-registry.module.code.ts"
import {
  closeScannerTallies,
  type DispatchedBucket,
  type NormalizedFinding,
  newScannerTallies,
  offerFileToEntries,
  scannerGroupKey,
  scriptKindFor,
} from "../../modules/syntax-scanner-entry/syntax-scanner-entry.module.code.ts"
import { listTsFiles } from "../../modules/ts-file-iteration/ts-file-iteration.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[syntax-bundle]"

function emitCleanScanners(buckets: readonly DispatchedBucket[]): undefined {
  for (let i = 0; i < ENTRIES.length; i += 1) {
    const entry = ENTRIES[i]
    const bucket = buckets[i]
    if (entry === undefined || bucket === undefined || bucket.findings.length > 0) continue
    const bound =
      bucket.weighed === 0
        ? `[EMPTY POPULATION — offered ${bucket.offered.toLocaleString()} file(s) and weighed none, so it certifies nothing]`
        : `[over ${bucket.weighed.toLocaleString()} of ${bucket.offered.toLocaleString()} file(s)]`
    process.stdout.write(`[${entry.name}] ${entry.successMessage} ${bound}\n`)
  }
}

function toolExit(message: string): never {
  return exitOnToolError({ error: new Error(message), prefix: PREFIX })
}

const WIDENING_PATHS = ["packages/infra/checks/", "akasha/pages-system/pages-core/"]

async function main(): Promise<never> {
  let flags: {
    repoRoot: string | undefined
    treeSha: string | undefined
    cacheDir: string | undefined
    jsonOutput: boolean
  }
  try {
    const parsed = parseArgs(
      process.argv.slice(2),
      { ...STANDARD_FLAGS, treeSha: { kind: "string" }, cacheDir: { kind: "string" } },
      { passthrough: true }
    )
    flags = {
      repoRoot: parsed.flags.repoRoot,
      treeSha: parsed.flags.treeSha,
      cacheDir: parsed.flags.cacheDir,
      jsonOutput: parsed.flags.json,
    }
  } catch (err) {
    return toolExit(errorMessage(err))
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    return toolExit(`--repo-root ${repoRoot} does not exist`)
  }

  const closure = resolveChangeClosure({ repoRoot, widening: WIDENING_PATHS })
  const inClosure = (rel: string): boolean =>
    closure.kind === "whole-tree" || closure.files.has(rel)

  const tallies = newScannerTallies(ENTRIES.length)
  const scanned: string[] = []

  try {
    for (const rel of await listTsFiles({
      repoRoot,
      treeSha: flags.treeSha,
      cacheDir: flags.cacheDir,
    })) {
      if (!inClosure(rel)) continue
      const source = readFileSync(resolve(repoRoot, rel), "utf-8")
      scanned.push(rel)
      offerFileToEntries({
        entries: ENTRIES,
        tallies,
        rel,
        repoRoot,
        sourceFile: ts.createSourceFile(
          rel,
          source,
          ts.ScriptTarget.Latest,
          true,
          scriptKindFor(rel)
        ),
      })
    }
  } catch (err) {
    const trace = err instanceof Error && err.stack != null ? err.stack : errorMessage(err)
    return toolExit(`fatal: ${trace}`)
  }

  if (scanned.length === 0 && closure.kind === "whole-tree") {
    return toolExit(
      `scanned 0 TS files under ${repoRoot} — refusing to report ${ENTRIES.length} ` +
        `scanners clean over an empty population. Check that --repo-root names a git worktree whose ` +
        `files are tracked, or that the caller populated ctx.repoFiles for a .git-less tree.`
    )
  }

  if (scanned.length === 0) {
    process.stdout.write(
      `${PREFIX} OK — no TS file lies in ${describeClosure(closure)}, so none of the ` +
        `${ENTRIES.length} scanners had anything to measure.\n`
    )
    process.exit(0)
  }

  const buckets = closeScannerTallies({ entries: ENTRIES, tallies })
  const counts = buckets.map((b) => b.findings.length)
  emitCleanScanners(buckets)

  const violations: NormalizedFinding[] = []
  for (let i = 0; i < ENTRIES.length; i += 1) {
    const entry = ENTRIES[i]
    const bucket = buckets[i]
    if (entry === undefined || bucket === undefined || bucket.findings.length === 0) continue
    const spread = new Set(bucket.findings.map((f) => f.file)).size
    const groupKey = scannerGroupKey({
      name: entry.name,
      findings: bucket.findings.length,
      files: spread,
      ...(entry.remediationDoc == null ? {} : { remediationDoc: entry.remediationDoc }),
    })
    for (const f of bucket.findings) violations.push({ ...f, groupKey })
  }

  const findingsByFile = new Map<string, NormalizedFinding[]>()
  for (const v of violations) {
    const forFile = findingsByFile.get(v.file) ?? []
    forFile.push(v)
    findingsByFile.set(v.file, forFile)
  }
  const { population } = examinePopulation<string, NormalizedFinding>({
    members: scanned,
    unit: "TS files",
    membership: {
      kind: "enumerated",
      because:
        "`scanned` is the file graph's own TS enumeration narrowed by path to the change " +
        "closure — the graph is whole before the walk starts, built in process or parsed " +
        "back and rejected entire on any malformation, and the per-file read above raises " +
        "into the tool-error exit rather than being stepped past",
    },
    labelOf: (rel) => rel,
    siteOf: (rel) => resolve(repoRoot, rel),
    examine: (rel) => findingsByFile.get(rel) ?? [],
  })

  const flagged = counts.filter((c) => c > 0).length
  const populationText = `${scanned.length.toLocaleString()} TS file(s) in ${describeClosure(closure)}`
  return exitOnResult<NormalizedFinding>({
    violations,
    options: {
      format: flags.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header: "Syntax scanner findings",
      successMessage: `OK — all ${ENTRIES.length} scanners clean over ${populationText}.`,
      population,
      groupBy: (f) => f.groupKey,
      formatViolation: (f) => `${f.file}:${f.line}:${f.column} ${f.message}`,
      footer: (count) =>
        `${PREFIX} ${count.toLocaleString()} total finding(s) across ${flagged} of ${ENTRIES.length} scanners over ${populationText}.`,
    },
  })
}

await main()
