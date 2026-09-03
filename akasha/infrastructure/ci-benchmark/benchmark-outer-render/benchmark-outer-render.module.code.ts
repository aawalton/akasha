import { formatRedSet } from "../benchmark-aggregate/benchmark-aggregate.module.code.ts"
import type { OuterReport } from "../benchmark-outer-core/benchmark-outer-core.module.code.ts"

export function renderReport(report: OuterReport): string {
  const lines: string[] = []
  lines.push(`benchmark: node=${report.meta.nodeUnderTest} sha=${report.meta.targetSha}`)
  lines.push(
    `concurrency=${report.meta.stepConcurrency} variants=${report.meta.storeVariantsRun.join(",")}`
  )
  lines.push(`CAVEAT: ${report.meta.baselineCaveat}`)
  lines.push(`BOUNDARY: ${report.meta.timedBoundaryNote}`)
  if (report.meta.unmeasuredVariants.length > 0) {
    lines.push(
      `UNMEASURED: ${report.meta.unmeasuredVariants.join(", ")} produced no report (pod died before emitting) — real measurement gap, not a pass`
    )
  }
  if (report.undeclaredReds.length > 0) {
    lines.push(
      `INVALID: undeclared red(s) [${formatRedSet(report.undeclaredReds)}] beyond the declared env-red set — run invalid pending investigation (a new env gap to declare, or a genuine regression)`
    )
  } else {
    lines.push("VALIDITY: OK — every red is within the declared env-red set")
  }
  lines.push("")

  for (const v of report.variants) {
    lines.push(`[family a] store=${v.store} smoke=${v.smoke.pass ? "PASS" : "FAIL"}`)
    lines.push(`  red set: ${formatRedSet(v.redSet)}`)
    if (!v.smoke.pass) lines.push(`  failed: ${v.smoke.failedSteps.join(", ")}`)
    for (const p of v.phases) {
      lines.push(
        `  ${p.phase}\t${p.totalStepSeconds}s\tsteps=${p.stepCount}\tskipped=${p.skippedCount}`
      )
    }
    lines.push(
      `  foreign-runtime census: count=${v.census.count}${v.census.count > 0 ? ` [${v.census.names.join(", ")}]` : " (empty — no registry drift)"}`
    )
    lines.push(`  wallClockMs=${v.inner.wallClockMs}`)
  }
  lines.push("")

  lines.push("[declared env-red set] expected reds on the hermetic pod (versioned, not frozen)")
  for (const d of report.declaredReds) {
    lines.push(`  ${d.name}(${d.exitCode})\t${d.cause}`)
  }
  lines.push("")

  lines.push("[family b] disk↔memory per-phase delta")
  if (report.storeDeltaRefusedReason !== null) {
    lines.push(`  REFUSED: ${report.storeDeltaRefusedReason}`)
  } else if (report.storeDelta === null) {
    lines.push("  n/a — only one store variant ran")
  } else {
    for (const d of report.storeDelta) {
      lines.push(
        `  ${d.phase}\tdisk=${d.diskMs}ms\tmemory=${d.memoryMs}ms\tΔ=${d.deltaMs}ms\t${d.speedupPct}% faster on memory`
      )
    }
  }
  lines.push("")

  lines.push("[family c-observed] real OutOfcpu events over run window (control)")
  if (report.outOfCpuObserved.count === null) {
    lines.push(
      `  node=${report.outOfCpuObserved.node} count=UNAVAILABLE — ${report.outOfCpuObserved.unavailableReason ?? "reason unrecorded"} (family c-sweep is the load-bearing c-metric)`
    )
  } else {
    lines.push(
      `  node=${report.outOfCpuObserved.node} count=${report.outOfCpuObserved.count} (expected ~0 — LocalExecutor bypasses admission)`
    )
  }
  lines.push("")

  lines.push("[family c-sweep] synthetic capacity-margin sweep (selectNext decider)")
  lines.push("  sticky\tmarginMillis\tadmitted\tpinned\theadOfLineHalts\twouldBeOutOfCpu")
  for (const r of report.marginSweep) {
    lines.push(
      `  ${r.stickyPinning}\t${r.marginMillis}\t${r.admitted}\t${r.pinned}\t${r.headOfLineHalts}\t${r.wouldBeOutOfCpu}`
    )
  }
  return lines.join("\n")
}
