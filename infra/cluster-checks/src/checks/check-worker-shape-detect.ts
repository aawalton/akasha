import { WORKER_SUFFIX } from "../lib/worker-suffix.ts"
import { findLoopIterationSites, siteOwesCadenceLabel } from "../lib/worker-shape-cadence"
import { resolveEmittedWorkerNames, workerStemOf } from "../lib/worker-shape-emitted-name"
import { stripComments } from "../lib/worker-shape-handlers"
import { workerIsInstrumented } from "../lib/worker-shape-instrumentation"
import {
  type WorkerShapeRuleReading,
  workerShapeRuleReading,
} from "../lib/worker-shape-rule-reading"

const ALLOWLISTED_BASENAMES: ReadonlySet<string> = new Set(["ci-pod-reaper-loop.worker.ts"])

export type WorkerShapeFinding =
  | { readonly kind: "missing-import"; readonly file: string }
  | { readonly kind: "missing-call"; readonly file: string }
  | { readonly kind: "missing-loop-metric"; readonly file: string }
  | {
      readonly kind: "emitted-name-mismatch"
      readonly file: string
      readonly stem: string
      readonly emitted: readonly string[]
      readonly unreadable: readonly string[]
    }
  | { readonly kind: "missing-cadence-label"; readonly file: string }

function isEventSubscribingWorker(source: string): boolean {
  if (source.includes("eventCategory:")) return true
  if (source.includes("subscriptions: [")) return true
  if (source.includes("EventsSubscriberManifestEntry")) return true
  if (/\brunLongRunningWorker\s*\(/.test(source)) return true
  return false
}

function importsRunLongRunningWorker(source: string): boolean {
  if (!source.includes('from "@shared/worker-runtime"')) return false
  return /\brunLongRunningWorker\b/.test(source)
}

function callsRunLongRunningWorker(source: string): boolean {
  return /\brunLongRunningWorker\s*\(/.test(source)
}

export function packageRootOfWorker(relPath: string): string | null {
  const idx = relPath.indexOf("/src/")
  if (idx === -1) return null
  return relPath.slice(0, idx + "/src/".length)
}

export interface WorkerShapeReport {
  readonly findings: readonly WorkerShapeFinding[]
  readonly rules: readonly WorkerShapeRuleReading[]
}

export const findWorkerShapeReport = (
  files: readonly { readonly relPath: string; readonly source: string }[]
): WorkerShapeReport => {
  const findings: WorkerShapeFinding[] = []
  const sourcesByPath = new Map<string, string>()
  for (const file of files) sourcesByPath.set(file.relPath, file.source)

  let workersOffered = 0
  let compositionWeighed = 0
  let compositionFindings = 0
  let loopMetricWeighed = 0
  let loopMetricFindings = 0
  let nameWeighed = 0
  let nameFindings = 0

  for (const { relPath, source } of files) {
    if (!relPath.endsWith(WORKER_SUFFIX)) continue
    if (relPath.endsWith(".test.ts")) continue
    const segs = relPath.split("/")
    if (segs.includes("dist")) continue
    workersOffered += 1
    const basename = segs[segs.length - 1] ?? relPath
    const subjectToComposition =
      !ALLOWLISTED_BASENAMES.has(basename) && isEventSubscribingWorker(source)

    nameWeighed += 1
    const stem = workerStemOf(relPath)
    const emitted = resolveEmittedWorkerNames(relPath, sourcesByPath)
    if (!emitted.resolved.has(stem)) {
      findings.push({
        kind: "emitted-name-mismatch",
        file: relPath,
        stem,
        emitted: [...emitted.resolved].sort(),
        unreadable: emitted.unresolved,
      })
      nameFindings += 1
    }

    compositionWeighed += 1
    if (subjectToComposition) {
      if (!importsRunLongRunningWorker(source)) {
        findings.push({ kind: "missing-import", file: relPath })
        compositionFindings += 1
        continue
      }
      if (!callsRunLongRunningWorker(source)) {
        findings.push({ kind: "missing-call", file: relPath })
        compositionFindings += 1
        continue
      }
    }

    loopMetricWeighed += 1
    if (!workerIsInstrumented(relPath, sourcesByPath)) {
      findings.push({ kind: "missing-loop-metric", file: relPath })
      loopMetricFindings += 1
    }
  }

  let cadenceOffered = 0
  let cadenceWeighed = 0
  let cadenceFindings = 0
  for (const { relPath, source } of files) {
    let fileHasFinding = false
    for (const site of findLoopIterationSites(stripComments(source))) {
      cadenceOffered += 1
      if (site.phase === null) continue
      cadenceWeighed += 1
      if (siteOwesCadenceLabel(site)) fileHasFinding = true
    }
    if (!fileHasFinding) continue
    findings.push({ kind: "missing-cadence-label", file: relPath })
    cadenceFindings += 1
  }

  findings.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : 0))
  return {
    findings,
    rules: [
      workerShapeRuleReading({
        rule: "composition",
        unit: "worker entrypoint",
        successMessage: "every event-subscribing worker imports and calls `runLongRunningWorker`.",
        scanned: workersOffered,
        compared: compositionWeighed,
        findings: compositionFindings,
      }),
      workerShapeRuleReading({
        rule: "loop-metric",
        unit: "worker entrypoint",
        successMessage: "every worker reaches a `worker.loop_duration_ms` emitter.",
        scanned: workersOffered,
        compared: loopMetricWeighed,
        findings: loopMetricFindings,
      }),
      workerShapeRuleReading({
        rule: "emitted-name",
        unit: "worker entrypoint",
        successMessage: "every worker emits under the filename stem its roster keys on.",
        scanned: workersOffered,
        compared: nameWeighed,
        findings: nameFindings,
      }),
      workerShapeRuleReading({
        rule: "cadence-label",
        unit: "measureLoopIteration call site",
        successMessage: "every interval-governed loop declares its `intervalMs`.",
        scanned: cadenceOffered,
        compared: cadenceWeighed,
        findings: cadenceFindings,
      }),
    ],
  }
}

export const findWorkerShapeViolations = (
  files: readonly { readonly relPath: string; readonly source: string }[]
): readonly WorkerShapeFinding[] => findWorkerShapeReport(files).findings
