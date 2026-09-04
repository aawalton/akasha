#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import ts from "typescript"
import { parseArgs, STANDARD_FLAGS } from "../cli-args/cli-args.module.code.ts"
import { examineFilePopulation } from "../population/population.module.code.ts"
import { remediationHint } from "../remediation-doc/remediation-doc.module.code.ts"
import { getRepoRoot } from "../repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../retired/retired.module.code.ts"
import {
  type NormalizedFinding,
  type SyntaxScannerEntry,
  scriptKindFor,
} from "../syntax-scanner-entry/syntax-scanner-entry.module.code.ts"
import { listTsFiles } from "../ts-file-iteration/ts-file-iteration.module.code.ts"
import {
  type AssertionFinding,
  scanTypeAssertions,
} from "../ts-type-assertions/ts-type-assertions.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
} from "../violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[type-assertions]"

const REMEDIATION_DOC = remediationHint("instead: a parse or a type predicate")

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

function isPermitted(finding: AssertionFinding): boolean {
  return finding.form === "as-const" || finding.form === "brand-constructor"
}

function messageOf(f: AssertionFinding): string {
  return `[${f.form}] ${f.snippet}`
}

export const typeAssertionsEntry: SyntaxScannerEntry = {
  name: "type-assertions",
  findFindings: (sf) => {
    const out: NormalizedFinding[] = []
    for (const f of scanTypeAssertions(sf)) {
      if (isPermitted(f)) continue
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
  successMessage: "No type-assertion findings outside `as const` / brand-constructor.",
  remediationDoc: REMEDIATION_DOC,
}

function toolExit(message: string): never {
  return exitOnToolError({ error: new Error(message), prefix: PREFIX })
}

function formatViolation(v: AssertionFinding): string {
  return `${v.file}:${v.line}:${v.column} ${messageOf(v)}`
}

async function main(): Promise<never> {
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
    return toolExit(errorMessage(err))
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    return toolExit(`--repo-root ${repoRoot} does not exist`)
  }

  let files: readonly string[]
  try {
    files = await listTsFiles({
      repoRoot,
      treeSha: flags.treeSha,
      cacheDir: flags.cacheDir,
    })
  } catch (err) {
    return toolExit(`Failed to enumerate ts files: ${errorMessage(err)}`)
  }

  const { population, violations: findings } = examineFilePopulation<AssertionFinding>({
    files,
    unit: "*.ts/.tsx files",
    membership: {
      kind: "enumerated",
      because:
        "`listTsFiles` reads its members off the file graph, which is whole before this call " +
        "returns — built in process, or parsed back from the cache and rejected entire by " +
        "`readCachedGraph` on any malformation, never accepted part-built — so fewer members " +
        "means fewer TS files in the tree",
    },
    pathOf: (rel) => resolve(repoRoot, rel),
    scan: (rel, source) => {
      const sf = ts.createSourceFile(rel, source, ts.ScriptTarget.Latest, true, scriptKindFor(rel))
      const found: AssertionFinding[] = []
      for (const f of scanTypeAssertions(sf)) {
        if (isPermitted(f)) continue
        found.push(f)
      }
      return found
    },
  })
  const fileCount = population.examined.length

  const byForm = new Map<string, number>()
  for (const f of findings) byForm.set(f.form, (byForm.get(f.form) ?? 0) + 1)
  const formTally = [...byForm]
    .sort((a, b) => b[1] - a[1])
    .map(([form, n]) => `${form} ${n.toLocaleString()}`)
    .join(", ")
  const scanned = `${fileCount.toLocaleString()} *.ts/.tsx scanned`

  return exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `type-assertion findings outside \`as const\` / brand-constructor — ${formTally}`,
      successMessage: `No type-assertion findings outside \`as const\` / brand-constructor (${scanned}).`,
      remediationDoc: REMEDIATION_DOC,
      groupBy: (v) => topLevelGroup(v.file),
      formatViolation,
      footer: (count) =>
        `${PREFIX} ${count.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s), ${scanned} → see ${REMEDIATION_DOC}`,
    },
  })
}

if (import.meta.main) {
  main().catch((err: unknown) => toolExit(`Unexpected error: ${errorMessage(err)}`))
}
