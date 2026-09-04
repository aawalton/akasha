import type {
  BenchmarkPhase,
  InnerReport,
  StepTiming,
  StoreVariant,
} from "../benchmark-report-types/benchmark-report-types.module.code.ts"

export const BENCHMARK_STEP_CONCURRENCY = 4

export const BENCHMARK_REPORT_SENTINEL = "##BENCHMARK_REPORT_V1##"

export interface Semaphore {
  readonly run: <T>(fn: () => Promise<T>) => Promise<T>
}

export function createSemaphore(limit: number): Semaphore {
  const cap = limit > 0 ? limit : 1
  let active = 0
  const waiters: (() => void)[] = []

  function acquire(): Promise<void> {
    return new Promise((resolve) => {
      if (active < cap) {
        active += 1
        resolve()
        return
      }
      waiters.push(() => {
        active += 1
        resolve()
      })
    })
  }

  function release(): undefined {
    active -= 1
    const next = waiters.shift()
    if (next !== undefined) next()
  }

  return {
    run: async <T>(fn: () => Promise<T>): Promise<T> => {
      await acquire()
      try {
        return await fn()
      } finally {
        release()
      }
    },
  }
}

export function phaseRepoRoot(phase: BenchmarkPhase, sha: string, preludeDir: string): string {
  return phase === "cold-stage" ? preludeDir : `/ci-storage/checkouts/${sha}`
}

export function computeBenchmarkExit(phaseFailures: readonly string[]): number {
  return phaseFailures.length > 0 ? 1 : 0
}

export interface AssembleReportArgs {
  readonly node: string
  readonly store: StoreVariant
  readonly targetSha: string
  readonly wallClockMs: number
  readonly steps: readonly StepTiming[]
}

export function assembleInnerReport(args: AssembleReportArgs): InnerReport {
  return {
    node: args.node,
    store: args.store,
    targetSha: args.targetSha,
    wallClockMs: args.wallClockMs,
    steps: [...args.steps],
    preludeExcludedFromColdStage: true,
  }
}
