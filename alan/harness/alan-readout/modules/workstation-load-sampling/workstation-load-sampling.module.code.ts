import { readFileSync } from "node:fs"
import { memoryIn } from "akasha/alan/harness/readout/group/pages/workstation/readouts/memory/workstation-memory.readout.reading.code.ts"
import {
  type ProcessorTimes,
  processorIn,
  processorTimesIn,
} from "akasha/alan/harness/readout/group/pages/workstation/readouts/processor/workstation-processor.readout.reading.code.ts"
import {
  keepReading,
  readoutPage,
} from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import { keepBeat } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-beating/service-beating.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

export const SAMPLE_MS = 5_000

export const BEAT_EVERY = 12

export const PROCESSOR_SLUG = "workstation-processor"

export const MEMORY_SLUG = "workstation-memory"

export const STAT_AT = "/proc/stat"

export const MEMINFO_AT = "/proc/meminfo"

const SAMPLER_SERVICE = "service-workstation"

export const SAMPLER_SLUG = "workstation-load-sampler"

export type Kernel = {
  readonly stat: () => string
  readonly meminfo: () => string
}

export const PROC: Kernel = {
  stat: () => readFileSync(STAT_AT, "utf8"),
  meminfo: () => readFileSync(MEMINFO_AT, "utf8"),
}

export type Pages = {
  readonly processor: string
  readonly memory: string
}

export type Sample = {
  readonly processor: number | null
  readonly memory: number | null
}

export type Kept = (root: string, page: string, value: number, at: Date) => undefined

export function samplerPage(root: string): string {
  const listed = listedAt(root, SAMPLER_SERVICE, SAMPLER_SLUG)[0]
  if (listed === undefined) {
    throw new Error(
      `no \`${SAMPLER_SERVICE}\` is slugged \`${SAMPLER_SLUG}\`, so a beat would be kept nowhere`
    )
  }
  return listed.path
}

export function readoutPages(root: string): Pages {
  return { processor: readoutPage(root, PROCESSOR_SLUG), memory: readoutPage(root, MEMORY_SLUG) }
}

export function wholePercent(share: number | null): number | null {
  return share === null ? null : Math.round(share)
}

export function takerOf(
  root: string,
  pages: Pages,
  kernel: Kernel = PROC,
  kept: Kept = keepReading
): (now: Date) => Sample {
  let before: ProcessorTimes | null = null
  let lastProcessor: number | null = null
  let lastMemory: number | null = null
  return (now: Date): Sample => {
    const times = processorTimesIn(kernel.stat())
    const processor =
      before === null || times === null ? null : wholePercent(processorIn(before, times))
    if (times !== null) before = times
    const memory = memoryIn(kernel.meminfo())
    if (processor !== null && processor !== lastProcessor) {
      kept(root, pages.processor, processor, now)
      lastProcessor = processor
    }
    if (memory !== null && memory !== lastMemory) {
      kept(root, pages.memory, memory, now)
      lastMemory = memory
    }
    return { processor, memory }
  }
}

export function sampleLoad(ended: (thrown: unknown) => undefined): () => undefined {
  const root = rootFor(resolveRoots(), AKASHA)
  const page = samplerPage(root)
  const take = takerOf(root, readoutPages(root))
  let taken = 0
  let ticking: ReturnType<typeof setInterval> | null = null
  const stop = (): undefined => {
    if (ticking !== null) clearInterval(ticking)
    ticking = null
    return undefined
  }
  const tick = (): undefined => {
    try {
      const now = new Date()
      take(now)
      taken += 1
      if (taken % BEAT_EVERY === 0) keepBeat(root, page, now)
    } catch (thrown) {
      stop()
      ended(thrown)
    }
    return undefined
  }
  tick()
  if (ticking === null) ticking = setInterval(tick, SAMPLE_MS)
  return stop
}

if (import.meta.main) {
  sampleLoad((thrown: unknown): undefined => {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  })
}
