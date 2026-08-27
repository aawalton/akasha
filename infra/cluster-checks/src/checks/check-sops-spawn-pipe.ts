#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import ts from "typescript"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args.ts"
import { examineFilePopulation } from "../../../../../instructions/tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root.ts"
import {
  type NormalizedFinding,
  type SyntaxScannerEntry,
  scriptKindFor,
} from "../lib/syntax-scanner-entry.ts"
import { listTsFiles } from "../lib/ts-file-iteration.ts"
import { type SopsSpawnPipeFinding, scanSopsSpawnPipe } from "../lib/ts-sops-spawn-pipe.ts"
import { exitOnResult } from "../../../../../instructions/tools/lib/check-workflow/violation-reporter"

const PREFIX = "[sops-spawn-pipe]"

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

function messageOf(v: SopsSpawnPipeFinding): string {
  return (
    `${v.callee}(..., "/dev/stdin", ...) with sops marker — fails with ENXIO at runtime; ` +
    "write the plaintext to a real file and pass its path as the positional arg, with " +
    "`--filename-override <destSopsPath>` so the `.sops.yaml` creation rule still matches, " +
    "or call `encryptFile` from the talos package's `src/lib/sops.ts` in the instructions repo"
  )
}

function formatViolation(v: SopsSpawnPipeFinding): string {
  return `${v.file}:${v.line}:${v.column} ${messageOf(v)}`
}

const SUCCESS_MESSAGE = "No sops + `/dev/stdin` literal pairs detected in call args."

export const sopsSpawnPipeEntry: SyntaxScannerEntry = {
  name: "sops-spawn-pipe",
  findFindings: (sf) => {
    const out: NormalizedFinding[] = []
    for (const f of scanSopsSpawnPipe(sf)) {
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

  const { population, violations: findings } = examineFilePopulation<SopsSpawnPipeFinding>({
    files: await listTsFiles({
      repoRoot,
      treeSha: flags.treeSha,
      cacheDir: flags.cacheDir,
    }),
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "`listTsFiles` reads its members off the file graph, which is whole before this " +
        "call returns — built in process, or parsed back from the cache and rejected " +
        "entire on any malformation — so fewer members means fewer TS files in the tree",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, source) =>
      scanSopsSpawnPipe(
        ts.createSourceFile(rel, source, ts.ScriptTarget.Latest, true, scriptKindFor(rel))
      ),
  })

  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `sops + \`/dev/stdin\` literal pairs — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
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
