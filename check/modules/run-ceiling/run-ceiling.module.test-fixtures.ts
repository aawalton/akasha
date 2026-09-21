import type { Cost } from "akasha/check/modules/cost/check-cost.module.code.ts"
import type { Bounded } from "akasha/check/modules/run-ceiling/run-ceiling.module.code.ts"

const BURNS = "burns-cpu"

export const BURNS_AT = "akasha/checks-system/check-code/burns-cpu/burns-cpu.check-code.ts"

export const GATHERED: Bounded = {
  slug: BURNS,
  page: BURNS_AT,
}

export const SLOWER = "node-05"

export const SPENT_ON_THE_SLOWER_NODE: readonly (readonly [string, number, number])[] = [
  ["lint-clean", 573.314, 420],
  ["typecheck", 373.865, 300],
  ["no-unused-exports", 132.132, 120],
  ["page-matches-its-type", 65.027, 60],
  ["no-page-address-spelled", 33.719, 30],
  ["no-class", 15.424, 15],
]

export function costing(own: number, child: number): Cost {
  return {
    runId: "one",
    ranAt: "",
    phase: "change",
    ran: BURNS,
    wallMs: 0,
    cpuSeconds: own,
    childCpuSeconds: child,
    peakBytes: 0,
    residentBeforeBytes: 0,
    peakAddedBytes: 0,
    peakMeasured: true,
    readCalls: 0,
    writeCalls: 0,
    readBytes: 0,
    pathsChanged: 1,
    refusals: 0,
  }
}
