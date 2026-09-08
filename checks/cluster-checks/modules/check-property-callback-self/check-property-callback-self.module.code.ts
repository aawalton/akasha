#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import ts from "typescript"
import { parseArgs, STANDARD_FLAGS } from "../cli-args/cli-args.module.code.ts"
import { isLuaCompilerSourcePath } from "../lua-compiler-sources/lua-compiler-sources.module.code.ts"
import { examineFilePopulation } from "../population/population.module.code.ts"
import { getRepoRoot } from "../repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../retired/retired.module.code.ts"
import {
  type NormalizedFinding,
  type SyntaxScannerEntry,
  scriptKindFor,
} from "../syntax-scanner-entry/syntax-scanner-entry.module.code.ts"
import { listTsFiles } from "../ts-file-iteration/ts-file-iteration.module.code.ts"
import {
  type PropertyCallbackSelfFinding,
  scanPropertyCallbackSelf,
} from "../ts-property-callback-self/ts-property-callback-self.module.code.ts"
import { exitOnResult } from "../violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[property-callback-self]"

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

function messageOf(v: PropertyCallbackSelfFinding): string {
  return `property-style callback \`${v.name}\` lacks an explicit \`this\` parameter — the Lua compiler defaults to method-context and emits a hidden self param that shifts arguments when a Lua-native caller (table.sort, pcall, ZO_*) invokes it; declare \`this: void\` for a plain callback, or \`this: Receiver\` for a colon-called self-method`
}

function formatViolation(v: PropertyCallbackSelfFinding): string {
  return `${v.file}:${v.line}:${v.column} ${messageOf(v)}`
}

const SUCCESS_MESSAGE = "All property-style interface callbacks declare `this: void`."

export const propertyCallbackSelfEntry: SyntaxScannerEntry = {
  name: "property-callback-self",
  preFileSkip: (rel, repoRoot) => !isLuaCompilerSourcePath(rel, repoRoot),
  findFindings: (sf) => {
    const out: NormalizedFinding[] = []
    for (const f of scanPropertyCallbackSelf(sf)) {
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

  const allTsFiles = await listTsFiles({
    repoRoot,
    treeSha: flags.treeSha,
    cacheDir: flags.cacheDir,
  })
  const { population, violations: findings } = examineFilePopulation<PropertyCallbackSelfFinding>({
    files: allTsFiles.filter((rel) => isLuaCompilerSourcePath(rel, repoRoot)),
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "`listTsFiles` reads its members off the file graph, which is whole before this " +
        "call returns — built in process, or parsed back from the cache and rejected " +
        "entire by `readCachedGraph` on any malformation, never accepted part-built — so " +
        "fewer members means fewer TS files in the tree",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, source) =>
      scanPropertyCallbackSelf(
        ts.createSourceFile(rel, source, ts.ScriptTarget.Latest, true, scriptKindFor(rel))
      ),
  })

  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `property-style callbacks missing \`this: void\` — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
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
