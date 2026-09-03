#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import ts from "typescript"
import { examineFilePopulation } from "../../../../../tools/lib/check-workflow/population.ts"
import { exitOnResult } from "../../../../../tools/lib/check-workflow/violation-reporter.ts"
import { parseArgs, STANDARD_FLAGS } from "../cli-args/cli-args.module.code.ts"
import { getRepoRoot } from "../repo-root/repo-root.module.code.ts"
import { CHECK_EXEMPT_DIRS } from "../repo-scope/repo-scope.module.code.ts"
import { refuseRetired } from "../retired/retired.module.code.ts"
import {
  type NormalizedFinding,
  type SyntaxScannerEntry,
  scriptKindFor,
} from "../syntax-scanner-entry/syntax-scanner-entry.module.code.ts"
import {
  approvedParseRoutes,
  type BoundaryReadFinding,
  scanBoundaryReads,
} from "../ts-boundary-reads/ts-boundary-reads.module.code.ts"
import { listTsFiles } from "../ts-file-iteration/ts-file-iteration.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[boundary-parse]"

const SUCCESS_MESSAGE =
  "Every external-boundary read in a detected spelling is parsed. Four spellings are outside the detector — this check's header names them and how many live sites each holds."

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

function messageOf(v: BoundaryReadFinding): string {
  return (
    `${v.kind} — ${v.snippet} — parse it in the same enclosing block: ` + `${approvedParseRoutes()}`
  )
}

function formatViolation(v: BoundaryReadFinding): string {
  return `${v.file}:${v.line}:${v.column} ${messageOf(v)}`
}

function isExcluded(rel: string): boolean {
  if (rel.endsWith(".d.ts")) return true
  if (rel.endsWith(".generated.ts") || rel.endsWith(".generated.tsx")) return true
  for (const seg of rel.split("/")) {
    if (CHECK_EXEMPT_DIRS.has(seg)) return true
  }
  return false
}

export const boundaryParseEntry: SyntaxScannerEntry = {
  name: "boundary-parse",
  preFileSkip: (rel) => isExcluded(rel),
  findFindings: (sf) => {
    const out: NormalizedFinding[] = []
    for (const f of scanBoundaryReads(sf)) {
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
  successMessage: SUCCESS_MESSAGE,
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
  const { population, violations: findings } = examineFilePopulation<BoundaryReadFinding>({
    files: [...tsFiles].sort().filter((rel) => !isExcluded(rel)),
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "the members are the TS-file nodes of the graph awaited just above, and a build that could not complete throws out of `listTsFiles` rather than handing back a partial node set",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (label, source) =>
      scanBoundaryReads(
        ts.createSourceFile(label, source, ts.ScriptTarget.Latest, true, scriptKindFor(label))
      ),
  })

  const distinctFiles = new Set(findings.map((f) => f.file)).size
  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `${findings.length.toLocaleString()} boundary read(s) without Zod parse across ${distinctFiles.toLocaleString()} file(s)`,
      successMessage: SUCCESS_MESSAGE,
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
