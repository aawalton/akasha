#!/usr/bin/env bun

import { existsSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import ts from "typescript"
import { parseArgs, STANDARD_FLAGS } from "../cli-args/cli-args.module.code.ts"
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
  applyFixes,
  scanVoidDeclarations,
  type VoidDeclarationFinding,
} from "../ts-void-declarations/ts-void-declarations.module.code.ts"
import { exitOnResult } from "../violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[no-void-return]"

const FLAG_SPEC = {
  ...STANDARD_FLAGS,
  fix: { kind: "boolean" },
  treeSha: { kind: "string" },
  cacheDir: { kind: "string" },
} as const

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

function messageOf(v: VoidDeclarationFinding): string {
  return `${v.kind} returns \`: void\` — migrate to \`: undefined\``
}

function formatViolation(v: VoidDeclarationFinding): string {
  return `${v.file}:${v.line}:${v.column} ${messageOf(v)}`
}

export const noVoidReturnEntry: SyntaxScannerEntry = {
  name: "no-void-return",
  findFindings: (sf) => {
    const out: NormalizedFinding[] = []
    for (const f of scanVoidDeclarations(sf)) {
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
  successMessage: "No `: void` return annotations on function definitions detected.",
}

async function main(): Promise<undefined> {
  let flags: {
    json: boolean
    repoRoot: string | undefined
    fix: boolean
    treeSha: string | undefined
    cacheDir: string | undefined
  }
  try {
    const parsed = parseArgs(process.argv.slice(2), FLAG_SPEC, { passthrough: true })
    flags = {
      json: parsed.flags.json,
      repoRoot: parsed.flags.repoRoot,
      fix: parsed.flags.fix,
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

  let filesFixed = 0

  const { population, violations: findings } = examineFilePopulation<VoidDeclarationFinding>({
    files: await listTsFiles({
      repoRoot,
      treeSha: flags.treeSha,
      cacheDir: flags.cacheDir,
    }),
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "`listTsFiles` reads its members off `graph.nodes(TS_FILE_NODE_TYPES)` on a graph it awaits, and a build that fails rejects that promise rather than returning a partial list, so fewer members means fewer TS files on disk",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (rel, source) => {
      const sf = ts.createSourceFile(rel, source, ts.ScriptTarget.Latest, true, scriptKindFor(rel))
      const fileFindings = scanVoidDeclarations(sf)
      if (fileFindings.length === 0) return []
      if (!flags.fix) return fileFindings
      const next = applyFixes(source, fileFindings)
      if (next !== source) {
        writeFileSync(`${repoRoot}/${rel}`, next, "utf-8")
        filesFixed += 1
      }
      return []
    },
  })

  if (flags.fix) {
    process.stdout.write(
      `${PREFIX} fixed ${filesFixed.toLocaleString()} file(s); run typecheck to confirm.\n`
    )
    process.exit(0)
  }

  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `\`: void\` return annotations on function definitions — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
      successMessage: "No `: void` return annotations on function definitions detected.",
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
