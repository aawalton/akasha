#!/usr/bin/env bun

import { refuseRetired } from "../lib/retired.ts"

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import ts from "typescript"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args.ts"
import { errorMessage } from "../../../../tools/lib/check-workflow/error-message"
import { examineFilePopulation } from "../../../../tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root.ts"
import {
  type NormalizedFinding,
  type SyntaxScannerEntry,
  scriptKindFor,
} from "../lib/syntax-scanner-entry.ts"
import {
  type ExhaustiveDispatchFinding,
  scanExhaustiveDispatch,
} from "../lib/ts-exhaustive-dispatch.ts"
import { listTsFiles } from "../lib/ts-file-iteration.ts"
import { exitOnResult } from "../../../../tools/lib/check-workflow/violation-reporter"

if (import.meta.main) refuseRetired()

const PREFIX = "[exhaustive-dispatch]"

function isPerCheckSkip(rel: string): boolean {
  if (rel.endsWith(".test.ts") || rel.endsWith(".test.tsx")) return true
  return false
}

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

function messageOf(v: ExhaustiveDispatchFinding): string {
  return v.message
}

function formatViolation(v: ExhaustiveDispatchFinding): string {
  return `${v.file}:${v.line}:${v.column} ${messageOf(v)}`
}

export const exhaustiveDispatchEntry: SyntaxScannerEntry = {
  name: "exhaustive-dispatch",
  preFileSkip: (rel) => isPerCheckSkip(rel),
  findFindings: (sf) => {
    const out: NormalizedFinding[] = []
    for (const f of scanExhaustiveDispatch(sf)) {
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
  successMessage: "All switch statements have a conforming default clause.",
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
    process.stderr.write(`${PREFIX} ${errorMessage(err)}\n`)
    process.exit(2)
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    process.stderr.write(`${PREFIX} --repo-root ${repoRoot} does not exist\n`)
    process.exit(2)
  }

  const { population, violations: findings } = examineFilePopulation<ExhaustiveDispatchFinding>({
    files: (
      await listTsFiles({ repoRoot, treeSha: flags.treeSha, cacheDir: flags.cacheDir })
    ).filter((rel) => !isPerCheckSkip(rel)),
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "`listTsFiles` reads its members off the ts-file graph, which is either loaded whole from the tree-sha-keyed cache or rebuilt in process by `engine.build`, and a build that cannot enumerate the repo raises rather than handing back a smaller graph",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, source) =>
      scanExhaustiveDispatch(
        ts.createSourceFile(rel, source, ts.ScriptTarget.Latest, true, scriptKindFor(rel))
      ),
  })

  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `switch statements missing exhaustive-dispatch default — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
      successMessage: "All switch statements have a conforming default clause.",
      groupBy: (v) => topLevelGroup(v.file),
      formatViolation,
    },
  })
}

if (import.meta.main) {
  main().catch((err) => {
    process.stderr.write(`${PREFIX} Unexpected error: ${errorMessage(err)}\n`)
    process.exit(2)
  })
}
