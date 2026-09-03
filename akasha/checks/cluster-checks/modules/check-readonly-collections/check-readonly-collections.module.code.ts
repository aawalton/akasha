#!/usr/bin/env bun

import { existsSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import ts from "typescript"
import { examineFilePopulation } from "../../../../../tools/lib/check-workflow/population.ts"
import { exitOnResult } from "../../../../../tools/lib/check-workflow/violation-reporter.ts"
import { parseArgs, STANDARD_FLAGS } from "../cli-args/cli-args.module.code.ts"
import { getRepoRoot } from "../repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../retired/retired.module.code.ts"
import {
  type NormalizedFinding,
  type SyntaxScannerEntry,
  scriptKindFor,
} from "../syntax-scanner-entry/syntax-scanner-entry.module.code.ts"
import {
  applyFixes,
  type CollectionFinding,
  scanCollectionTypes,
} from "../ts-collection-types/ts-collection-types.module.code.ts"
import { listTsFiles } from "../ts-file-iteration/ts-file-iteration.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[readonly-collections]"

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

function describeForm(form: CollectionFinding["form"]): string {
  if (form === "array") return "`T[]`"
  if (form === "array-reference") return "`Array<T>`"
  return "tuple"
}

function describePosition(pos: CollectionFinding["escapePosition"]): string {
  if (pos === "parameter") return "parameter type"
  if (pos === "return-type") return "return type"
  if (pos === "property-signature") return "property type"
  return "type alias body"
}

function messageOf(v: CollectionFinding): string {
  return `mutable ${describeForm(v.form)} in ${describePosition(v.escapePosition)} — migrate to readonly form`
}

function formatViolation(v: CollectionFinding): string {
  return `${v.file}:${v.line}:${v.column} ${messageOf(v)}`
}

function isTstlAddonPath(rel: string): boolean {
  if (rel.startsWith("temper/addons/")) return true
  if (/^temper\/[^/]*-addon\//.test(rel)) return true
  return false
}

export const readonlyCollectionsEntry: SyntaxScannerEntry = {
  name: "readonly-collections",
  preFileSkip: (rel) => isTstlAddonPath(rel),
  findFindings: (sf) => {
    const out: NormalizedFinding[] = []
    for (const f of scanCollectionTypes(sf)) {
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
  successMessage: "No mutable collection types in escape positions detected.",
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
    process.stderr.write(`${PREFIX} ${errorMessage(err)}\n`)
    process.exit(2)
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    process.stderr.write(`${PREFIX} --repo-root ${repoRoot} does not exist\n`)
    process.exit(2)
  }

  let filesFixed = 0

  const { population, violations: findings } = examineFilePopulation<CollectionFinding>({
    files: (
      await listTsFiles({ repoRoot, treeSha: flags.treeSha, cacheDir: flags.cacheDir })
    ).filter((rel) => !isTstlAddonPath(rel)),
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
    scan: (rel, source) => {
      const sf = ts.createSourceFile(rel, source, ts.ScriptTarget.Latest, true, scriptKindFor(rel))
      const fileFindings = scanCollectionTypes(sf)
      if (fileFindings.length === 0) return []
      if (flags.fix) {
        const next = applyFixes(source, fileFindings)
        if (next !== source) {
          writeFileSync(`${repoRoot}/${rel}`, next, "utf-8")
          filesFixed += 1
        }
        return []
      }
      return fileFindings
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
      header: `mutable collection types in escape positions — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
      successMessage: "No mutable collection types in escape positions detected.",
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
