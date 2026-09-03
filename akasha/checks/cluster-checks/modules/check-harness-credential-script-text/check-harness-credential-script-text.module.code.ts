#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { resolve } from "node:path"
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
import { listTsFiles } from "../ts-file-iteration/ts-file-iteration.module.code.ts"
import {
  type HarnessCredentialScriptTextFinding,
  scanHarnessCredentialScriptText,
} from "../ts-harness-credential-script-text/ts-harness-credential-script-text.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[harness-credential-script-text]"

const HARNESS_PREFIX = "akasha/browser/test-harness/"

function inScope(rel: string): boolean {
  if (rel.endsWith(".d.ts")) return false
  if (/\.(?:unit|cli|integration|browser|db|component|smoke)?\.?test\.tsx?$/.test(rel)) return false
  if (!rel.startsWith(HARNESS_PREFIX)) return false
  if (rel.includes("/dist/")) return false
  return true
}

function messageOf(v: HarnessCredentialScriptTextFinding): string {
  return `credential '${v.identifier}' interpolated into ${v.method}(...) script text — route it through .fill()/the function form's bound arg/signInWithPassword instead`
}

function formatViolation(v: HarnessCredentialScriptTextFinding): string {
  return `${v.file}:${v.line}:${v.column} ${messageOf(v)}`
}

const SUCCESS_MESSAGE =
  "No credential is interpolated into evaluate/waitForFunction script text in the harness."

export const harnessCredentialScriptTextEntry: SyntaxScannerEntry = {
  name: "harness-credential-script-text",
  preFileSkip: (rel) => !inScope(rel),
  findFindings: (sf) => {
    const out: NormalizedFinding[] = []
    for (const f of scanHarnessCredentialScriptText(sf)) {
      out.push({
        file: f.file,
        line: f.line,
        column: f.column,
        message: messageOf(f),
        groupKey: HARNESS_PREFIX,
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

  const { population, violations: findings } =
    examineFilePopulation<HarnessCredentialScriptTextFinding>({
      files: (
        await listTsFiles({ repoRoot, treeSha: flags.treeSha, cacheDir: flags.cacheDir })
      ).filter(inScope),
      unit: "source files",
      membership: {
        kind: "enumerated",
        because:
          "`listTsFiles` reads its members off the ts-file graph, which is either loaded whole from the tree-sha-keyed cache or rebuilt in process by `engine.build`, and a build that cannot enumerate the repo raises rather than handing back a smaller graph",
      },
      pathOf: (rel) => `${repoRoot}/${rel}`,
      scan: (rel, source) => {
        const sf = ts.createSourceFile(
          rel,
          source,
          ts.ScriptTarget.Latest,
          true,
          scriptKindFor(rel)
        )
        return scanHarnessCredentialScriptText(sf)
      },
    })

  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `credential(s) interpolated into evaluate/waitForFunction script text — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
      successMessage: SUCCESS_MESSAGE,
      groupBy: () => HARNESS_PREFIX,
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
