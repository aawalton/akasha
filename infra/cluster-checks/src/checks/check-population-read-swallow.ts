#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import ts from "typescript"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args.ts"
import { errorMessage } from "../../../../../instructions/tools/lib/check-workflow/error-message"
import { examineFilePopulation } from "../../../../../instructions/tools/lib/check-workflow/population"
import { repoDoc } from "../../../../../instructions/tools/lib/check-workflow/remediation-doc"
import { getRepoRoot } from "../lib/repo-root.ts"
import {
  type NormalizedFinding,
  type SyntaxScannerEntry,
  scriptKindFor,
} from "../lib/syntax-scanner-entry.ts"
import { listTsFiles } from "../lib/ts-file-iteration.ts"
import {
  type PopulationReadSwallowFinding,
  scanPopulationReadSwallow,
} from "../lib/ts-population-read-swallow.ts"
import { exitOnResult } from "../../../../../instructions/tools/lib/check-workflow/violation-reporter"

const PREFIX = "[population-read-swallow]"

const REMEDIATION_DOC = repoDoc("infra/cluster-checks/src/lib/population.ts")

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
