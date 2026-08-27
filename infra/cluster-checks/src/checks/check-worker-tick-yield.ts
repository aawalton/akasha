#!/usr/bin/env bun

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { buildFrom, readAt } from "../../../../../instructions/tools/lib/graph/held-snapshot.ts"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args"
import { errorMessage } from "../../../../../instructions/tools/lib/check-workflow/error-message"
import { examineFilePopulation } from "../../../../../instructions/tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root"
import { exitOnResult } from "../../../../../instructions/tools/lib/check-workflow/violation-reporter"
import {
  runtimeImportsByRelPath,
  type TickPopulationCandidate,
  tickParticipatingPaths,
} from "../lib/worker-tick-population"
import {
  type AwaitingLoopKind,
  findUnguardedAwaitingLoops,
  hasTickYieldIrreduciblePragma,
  LOOP_KIND_ITERATES,
} from "../lib/worker-tick-yield"

const PREFIX = "[worker-tick-yield]"

const ALLOWLISTED_FILES: ReadonlySet<string> = new Set([
  "packages/shared/worker-runtime/src/for-each-abortable.ts",
])

export interface WorkerTickYieldFinding {
  readonly kind: "unguarded-awaiting-loop"
  readonly file: string
  readonly line: number
  readonly loopKind: AwaitingLoopKind
}

export interface WorkerTickFile {
  readonly relPath: string
  readonly source: string
  readonly runtimeImports: readonly string[]
}

export const findWorkerTickYieldViolations = (
  files: readonly WorkerTickFile[]
): readonly WorkerTickYieldFinding[] => {
  const candidates: TickPopulationCandidate[] = files.map(({ relPath, runtimeImports }) => ({
    relPath,
    runtimeImports,
  }))
  const members = new Set(tickParticipatingPaths(candidates))

  const findings: WorkerTickYieldFinding[] = []
  for (const { relPath, source } of files) {
    if (!members.has(relPath)) continue
    if (ALLOWLISTED_FILES.has(relPath)) continue
    if (hasTickYieldIrreduciblePragma(source)) continue
    for (const site of findUnguardedAwaitingLoops(source)) {
      findings.push({
        kind: "unguarded-awaiting-loop",
        file: relPath,
        line: site.line,
        loopKind: site.kind,
      })
    }
  }

  findings.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : a.line - b.line))
  return findings
}

function formatViolation(v: WorkerTickYieldFinding): string {
  const replace = LOOP_KIND_ITERATES.has(v.loopKind)
    ? "Replace the loop with `forEachAbortable(items, signal, async (x) => { ... })` from @shared/worker-runtime, OR add "
    : "Add "
  return `${v.file}:${v.line} — ${v.loopKind} loop body awaits but does not yield to AbortSignal. ${replace}\`signal.throwIfAborted()\` at the top of the loop body, or an \`.aborted\` guard in the loop's condition. For an irreducible single-op tick body, add the file-scope pragma \`// worker-shape: tick-yield-irreducible\` and document the drain bound.`
}

async function main(): Promise<undefined> {
  let flags: {
    json: boolean
    repoRoot: string | undefined
    treeSha: string
  }
  try {
    const parsed = parseArgs(
      process.argv.slice(2),
      { ...STANDARD_FLAGS, treeSha: { kind: "string", required: true } },
      { passthrough: true }
    )
    flags = {
      json: parsed.flags.json,
      repoRoot: parsed.flags.repoRoot,
      treeSha: parsed.flags.treeSha,
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

  let candidateRels: readonly string[]
  let importsByRelPath: ReadonlyMap<string, readonly string[]>
  try {
    const graph = await buildFrom(readAt(flags.treeSha).ctx)
    importsByRelPath = runtimeImportsByRelPath(graph)
    candidateRels = tickParticipatingPaths(
      [...importsByRelPath].map(([relPath, runtimeImports]) => ({ relPath, runtimeImports }))
    )
  } catch (err) {
    process.stderr.write(`${PREFIX} Failed to build ts-file graph: ${errorMessage(err)}\n`)
    process.exit(2)
  }

  const { population, violations: files } = examineFilePopulation<WorkerTickFile>({
    files: candidateRels,
    unit: "source files",
    membership: {
      kind: "enumerated",
      because:
        "`candidateRels` is every ts-file node the graph holds, narrowed by path and by " +
        "reachability from a `*.worker.ts` entry along the graph's own import edges, and a " +
        "build that throws is caught by the surrounding `try` and exits 2 rather than leaving " +
        "a partial graph, so fewer members means fewer tick-reachable files on disk",
    },
    pathOf: (rel) => `${repoRoot}/${rel}`,
    scan: (relPath, source) => [
      { relPath, source, runtimeImports: importsByRelPath.get(relPath) ?? [] },
    ],
  })

  const findings = findWorkerTickYieldViolations(files)

  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `worker-tick-yield violations — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
      successMessage:
        "Every awaiting loop a worker tick can reach yields to its AbortSignal. Sequential awaits outside a loop are not read — see this check's header.",
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
