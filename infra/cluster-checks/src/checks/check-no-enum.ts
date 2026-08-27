#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import ts from "typescript"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args.ts"
import { examineFilePopulation } from "../../../../../instructions/tools/lib/check-workflow/population"
import { remediationHint } from "../../../../../instructions/tools/lib/check-workflow/remediation-doc"
import { getRepoRoot } from "../lib/repo-root.ts"
import {
  type NormalizedFinding,
  type SyntaxScannerEntry,
  scriptKindFor,
} from "../lib/syntax-scanner-entry.ts"
import { type EnumDeclarationFinding, scanEnumDeclarations } from "../lib/ts-enum-declarations.ts"
import { listTsFiles } from "../lib/ts-file-iteration.ts"
import { exitOnResult } from "../../../../../instructions/tools/lib/check-workflow/violation-reporter"

const PREFIX = "[no-enum]"

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

function messageOf(v: EnumDeclarationFinding): string {
  return `${v.kind} ${v.name}`
}

function formatViolation(v: EnumDeclarationFinding): string {
  return `${v.file}:${v.line}:${v.column} ${messageOf(v)}`
}

const SUCCESS_MESSAGE = "No `enum` declarations detected."
const REMEDIATION_DOC = remediationHint("instead: a string-literal union")

export const noEnumEntry: SyntaxScannerEntry = {
  name: "no-enum",
  findFindings: (sf) => {
    const out: NormalizedFinding[] = []
    for (const f of scanEnumDeclarations(sf)) {
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
  remediationDoc: REMEDIATION_DOC,
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

  const { population, violations: findings } = examineFilePopulation<EnumDeclarationFinding>({
    files: await listTsFiles({
      repoRoot,
      treeSha: flags.treeSha,
      cacheDir: flags.cacheDir,
    }),
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "`listTsFiles` reads its members off the ts-file nodes of a graph that is already built when it " +
        "returns — a cache hit keyed on the tree sha, or an awaited `engine.build` that rejects rather " +
        "than yielding a graph missing nodes — and every skip it applies is decided from the path alone",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, source) =>
      scanEnumDeclarations(
        ts.createSourceFile(rel, source, ts.ScriptTarget.Latest, true, scriptKindFor(rel))
      ),
  })

  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `\`enum\` declarations — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
      successMessage: SUCCESS_MESSAGE,
      remediationDoc: REMEDIATION_DOC,
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
