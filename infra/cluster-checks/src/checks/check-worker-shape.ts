#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { buildFrom, readAt } from "../../../../tools/lib/graph/held-snapshot.ts"
import { WORKER_SUFFIX } from "../lib/worker-suffix.ts"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args"
import { errorMessage } from "../../../../tools/lib/check-workflow/error-message"
import { examinePopulation } from "../../../../tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root"
import { exitOnResult, exitOnToolError } from "../../../../tools/lib/check-workflow/violation-reporter"
import { renderWorkerShapeRuleReading } from "../lib/worker-shape-rule-reading"
import { TS_FILE_NODE_TYPES, tsFileNodeIdToCodeRepoRel } from "../../../../tools/lib/graph/producers/file/ts-file/types"
import {
  findWorkerShapeReport,
  findWorkerShapeViolations,
  packageRootOfWorker,
  type WorkerShapeFinding,
} from "./check-worker-shape-detect"

const PREFIX = "[worker-shape]"

export { findWorkerShapeViolations, type WorkerShapeFinding }

function formatViolation(v: WorkerShapeFinding): string {
  if (v.kind === "missing-import") {
    return `${v.file} — event-subscribing worker is missing \`import { runLongRunningWorker } from "@shared/worker-runtime"\``
  }
  if (v.kind === "missing-call") {
    return `${v.file} — event-subscribing worker imports \`runLongRunningWorker\` but never calls it`
  }
  if (v.kind === "missing-loop-metric") {
    return `${v.file} — worker emits no \`worker.loop_duration_ms\` metric: it neither composes through \`runLongRunningWorker\` from \`@shared/worker-runtime\` (which instruments boot + heartbeat + subscriber ticks) nor calls \`measureLoopIteration\`. A hand-rolled polling loop wraps its loop body in \`measureLoopIteration({ workerName, phase: "heartbeat", target: { pool }, intervalMs }, fn)\`.`
  }
  if (v.kind === "emitted-name-mismatch") {
    const emitted =
      v.emitted.length === 0
        ? "no name this check could resolve"
        : v.emitted.map((n) => `\`${n}\``).join(", ")
    const unreadable =
      v.unreadable.length === 0
        ? ""
        : ` Identifiers in a name position that bind to no string literal anywhere the entrypoint reaches: ${v.unreadable.map((n) => `\`${n}\``).join(", ")} — a name assembled at runtime cannot be checked against the stem, so bind it to a literal.`
    return `${v.file} — worker emits under ${emitted}, but every reader looks it up by its filename stem \`${v.stem}\`. \`discoverWorkers\` keys the supervisor's children and the heartbeat roster on the stem alone, and nothing reconciles the two — so this worker reads as \`NEVER\`, zero rows for the whole retention window, while running perfectly. Set the \`name\` / \`workerName\` it composes with to \`${v.stem}\`, or rename the file to the name it emits under.${unreadable}`
  }
  return `${v.file} — a \`measureLoopIteration\` call at \`phase: "heartbeat"\` passes no \`intervalMs\`. That argument becomes the \`interval_ms\` label, and the heartbeat reading sizes this worker's own tolerance from it; without it that reading falls back to a p95 of observed gaps, which is a fact about the cadence the worker USED to run at — a fleet retune called ten healthy workers dead that way (#16248). \`intervalMs\` is optional at the type only because subscriber and notify ticks are governed by no interval.`
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
    return exitOnToolError({ error: err, prefix: PREFIX })
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  if (!existsSync(repoRoot)) {
    return exitOnToolError({
      error: new Error(`--repo-root ${repoRoot} does not exist`),
      prefix: PREFIX,
    })
  }

  let inScopeFiles: readonly string[]
  try {
    const graph = await buildFrom(readAt(flags.treeSha).ctx)
    const workerPackageRoots = new Set<string>()
    const allTsRelPaths: string[] = []
    for (const node of graph.nodes(TS_FILE_NODE_TYPES)) {
      const rel = tsFileNodeIdToCodeRepoRel(node.id)
      if (rel === null) continue
      allTsRelPaths.push(rel)
      if (!rel.endsWith(WORKER_SUFFIX)) continue
      if (rel.endsWith(".test.ts")) continue
      const segs = rel.split("/")
      if (segs.includes("dist")) continue
      const root = packageRootOfWorker(rel)
      if (root !== null) workerPackageRoots.add(root)
    }
    const inScope: string[] = []
    for (const rel of allTsRelPaths) {
      const isWorker = rel.endsWith(WORKER_SUFFIX) && !rel.endsWith(".test.ts")
      let isWorkerPackageFile = false
      if (rel.endsWith(".ts") || rel.endsWith(".tsx")) {
        if (!rel.endsWith(".test.ts") && !rel.endsWith(".test.tsx")) {
          for (const root of workerPackageRoots) {
            if (rel.startsWith(root)) {
              isWorkerPackageFile = true
              break
            }
          }
        }
      }
      if (!isWorker && !isWorkerPackageFile) continue
      inScope.push(rel)
    }
    inScopeFiles = inScope
  } catch (err) {
    return exitOnToolError({
      error: new Error(`Failed to build ts-file graph: ${errorMessage(err)}`),
      prefix: PREFIX,
    })
  }

  const collected: { relPath: string; source: string }[] = []
  const { population } = examinePopulation({
    members: inScopeFiles,
    unit: "files",
    labelOf: (rel) => rel,
    siteOf: (rel) => `${repoRoot}/${rel}`,
    examine: (rel) => {
      collected.push({ relPath: rel, source: readFileSync(`${repoRoot}/${rel}`, "utf-8") })
      return []
    },
    membership: {
      kind: "enumerated",
      because:
        "`inScopeFiles` is narrowed by path alone out of `graph.nodes(TS_FILE_NODE_TYPES)`, " +
        "and a build that throws is caught by the surrounding `try` and leaves through " +
        "`exitOnToolError` rather than leaving a partial graph, so fewer members means fewer " +
        "worker files on disk",
    },
  })

  const { findings, rules } = findWorkerShapeReport(collected)

  for (const rule of rules) {
    process.stdout.write(`${renderWorkerShapeRuleReading(PREFIX, rule)}\n`)
  }

  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `worker-shape violations — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
      successMessage: "No worker-shape violations detected.",
      formatViolation,
    },
  })
}

if (import.meta.main) {
  main().catch((err: unknown) =>
    exitOnToolError({ error: new Error(`Unexpected error: ${errorMessage(err)}`), prefix: PREFIX })
  )
}
