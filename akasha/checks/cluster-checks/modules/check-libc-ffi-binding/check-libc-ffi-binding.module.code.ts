#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { parseArgs, STANDARD_FLAGS } from "../cli-args/cli-args.module.code.ts"
import {
  type LibcSonameFinding,
  scanLibcSonameBindings,
} from "../libc-ffi-binding/libc-ffi-binding.module.code.ts"
import { examineFilePopulation } from "../population/population.module.code.ts"
import { getRepoRoot } from "../repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../retired/retired.module.code.ts"
import type {
  NormalizedFinding,
  SyntaxScannerEntry,
} from "../syntax-scanner-entry/syntax-scanner-entry.module.code.ts"
import { listTsFiles } from "../ts-file-iteration/ts-file-iteration.module.code.ts"
import { exitOnResult } from "../violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[libc-ffi-binding]"

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

function messageOf(v: LibcSonameFinding): string {
  return `dlopen(${JSON.stringify(v.spec)}) binds libc by name — bind the object already in /proc/self/maps instead`
}

function formatViolation(v: LibcSonameFinding): string {
  return `${v.file}:${v.line}:${v.column} ${messageOf(v)}`
}

const SUCCESS_MESSAGE = "No libc bindings by soname detected."

export const libcFfiBindingEntry: SyntaxScannerEntry = {
  name: "libc-ffi-binding",
  findFindings: (sf) => {
    const out: NormalizedFinding[] = []
    for (const f of scanLibcSonameBindings({ file: sf.fileName, source: sf.text })) {
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

  const { population, violations: findings } = examineFilePopulation<LibcSonameFinding>({
    files: await listTsFiles({ repoRoot, treeSha: flags.treeSha, cacheDir: flags.cacheDir }),
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "`listTsFiles` reads its members off the ts-file graph, which is either loaded whole from the tree-sha-keyed cache or rebuilt in process by `engine.build`, and a build that cannot enumerate the repo raises rather than handing back a smaller graph",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, source) => scanLibcSonameBindings({ file: rel, source }),
  })

  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `libc bindings by soname — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
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
