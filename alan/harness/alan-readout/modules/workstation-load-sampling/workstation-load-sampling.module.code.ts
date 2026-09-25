import { readFileSync } from "node:fs"
import { join } from "node:path"
import { workstationLoadSampling } from "akasha/alan/harness/alan-readout/modules/workstation-load-sampling/workstation-load-sampling.module.ts"
import {
  keepReading,
  readoutsServedBy,
} from "akasha/alan/harness/readout/modules/reading/readout-reading.module.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { keepBeat } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-beating/service-beating.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

export const SAMPLE_MS = 5_000

export const BEAT_EVERY = 12

export const STAT_AT = "/proc/stat"

export const MEMINFO_AT = "/proc/meminfo"

const SAMPLER_SERVICE = "service-workstation"

export const SAMPLER_SLUG = "workstation-load-sampler"

const SERVED_BY = namedAs(module.slug, workstationLoadSampling.slug, null)

const PAGE_ENDING = ".ts"

const READING_CODE_ENDING = ".reading.code.ts"

export type Kernel = {
  readonly stat: () => string
  readonly meminfo: () => string
}

export const PROC: Kernel = {
  stat: () => readFileSync(STAT_AT, "utf8"),
  meminfo: () => readFileSync(MEMINFO_AT, "utf8"),
}

export type Sampler = (kernel: Kernel) => number | null

export type Sampled = {
  readonly page: string
  readonly sample: Sampler
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

export function readingCodeOf(page: string): string {
  return `${page.slice(0, -PAGE_ENDING.length)}${READING_CODE_ENDING}`
}

export async function samplersOf(root: string): Promise<readonly Sampled[]> {
  const found: Sampled[] = []
  for (const { path } of readoutsServedBy(root, SERVED_BY)) {
    const at = readingCodeOf(path)
    const code: { readonly sampler?: () => Sampler } = await import(join(root, at))
    if (code.sampler === undefined) {
      throw new Error(`\`${at}\` hands out no sampler, so \`${path}\` cannot be sampled`)
    }
    found.push({ page: path, sample: code.sampler() })
  }
  return found
}

export function takerOf(
  root: string,
  sampled: readonly Sampled[],
  kernel: Kernel = PROC,
  kept: Kept = keepReading
): (now: Date) => Readonly<Record<string, number | null>> {
  const last = new Map<string, number>()
  return (now) => {
    const taken: Record<string, number | null> = {}
    for (const { page, sample } of sampled) {
      const value = sample(kernel)
      taken[page] = value
      if (value === null || value === last.get(page)) continue
      kept(root, page, value, now)
      last.set(page, value)
    }
    return taken
  }
}

export function sampleLoad(ended: (thrown: unknown) => undefined): () => undefined {
  const root = rootFor(resolveRoots(), AKASHA)
  const page = samplerPage(root)
  let ticking: ReturnType<typeof setInterval> | null = null
  let stopped = false
  const stop = (): undefined => {
    stopped = true
    if (ticking !== null) clearInterval(ticking)
    ticking = null
    return undefined
  }
  const start = (sampled: readonly Sampled[]): undefined => {
    if (stopped) return undefined
    const take = takerOf(root, sampled)
    let taken = 0
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
    if (!stopped) ticking = setInterval(tick, SAMPLE_MS)
    return undefined
  }
  samplersOf(root).then(start, (thrown: unknown): undefined => {
    stop()
    ended(thrown)
    return undefined
  })
  return stop
}

if (import.meta.main) {
  sampleLoad((thrown: unknown): undefined => {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(1)
  })
}
