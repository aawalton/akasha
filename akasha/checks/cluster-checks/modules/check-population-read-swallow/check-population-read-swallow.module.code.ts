#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import ts from "typescript"
import { examineFilePopulation } from "../../../../../tools/lib/check-workflow/population.ts"
import { repoDoc } from "../../../../../tools/lib/check-workflow/remediation-doc.ts"
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
  type PopulationReadSwallowFinding,
  scanPopulationReadSwallow,
} from "../ts-population-read-swallow/ts-population-read-swallow.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[population-read-swallow]"

const REMEDIATION_DOC = repoDoc("tools/lib/check-workflow/population.ts")

function isExcluded(rel: string): boolean {
  return /\.(test|spec)\.tsx?$/.test(rel)
}

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

const SUCCESS =
  "Every population-declaring check either records a member it could not read or ends the run."

export const populationReadSwallowEntry: SyntaxScannerEntry = {
  name: "population-read-swallow",
  preFileSkip: (rel) => isExcluded(rel),
  findFindings: (sf) => {
    const out: NormalizedFinding[] = []
    for (const f of scanPopulationReadSwallow(sf)) {
      out.push({
        file: f.file,
        line: f.line,
        column: f.column,
        message: `— ${f.reason}`,
        groupKey: topLevelGroup(f.file),
      })
    }
    return out
  },
  successMessage: SUCCESS,
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
    process.stderr.write(`${PREFIX} ${errorMessage(err)}\n`)
    process.exit(2)
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    process.stderr.write(`${PREFIX} --repo-root ${repoRoot} does not exist\n`)
    process.exit(2)
  }

  const { population, violations: findings } = examineFilePopulation<PopulationReadSwallowFinding>({
    files: (
      await listTsFiles({ repoRoot, treeSha: flags.treeSha, cacheDir: flags.cacheDir })
    ).filter((rel) => !isExcluded(rel)),
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "`listTsFiles` reads its members off `graph.nodes(TS_FILE_NODE_TYPES)` on a graph it awaits, and a build that fails rejects that promise rather than returning a partial list, so fewer members means fewer TS files on disk",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (label, source) =>
      scanPopulationReadSwallow(
        ts.createSourceFile(label, source, ts.ScriptTarget.Latest, true, scriptKindFor(label))
      ),
  })

  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `population members dropped by a swallowed read — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
      successMessage: SUCCESS,
      remediationDoc: REMEDIATION_DOC,
      groupBy: (v) => topLevelGroup(v.file),
      formatViolation: (v: PopulationReadSwallowFinding) =>
        `${v.file}:${v.line}:${v.column} — ${v.reason}`,
    },
  })
}

if (import.meta.main) {
  main().catch((err) => {
    process.stderr.write(`${PREFIX} Unexpected error: ${errorMessage(err)}\n`)
    process.exit(2)
  })
}
