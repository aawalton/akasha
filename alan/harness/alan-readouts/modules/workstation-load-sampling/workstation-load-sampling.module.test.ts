import { expect, test } from "bun:test"
import {
  type Kernel,
  type Sample,
  takerOf,
  wholePercent,
} from "akasha/alan/harness/alan-readouts/modules/workstation-load-sampling/workstation-load-sampling.module.code.ts"

const ROOT = "/nowhere"

const PAGES = { processor: "processor.readout.ts", memory: "memory.readout.ts" }

const NOW = new Date("2026-09-14T12:00:00.000Z")

function stat(busy: number, idle: number): string {
  return `cpu  ${busy} 0 0 ${idle} 0 0 0 0 0 0\ncpu0 0 0 0 0 0 0 0 0 0 0\n`
}

function meminfo(total: number, available: number): string {
  return `MemTotal:       ${total} kB\nMemAvailable:   ${available} kB\n`
}

type Written = { readonly page: string; readonly value: number }

function scripted(stats: readonly string[], meminfos: readonly string[]) {
  let takes = 0
  const written: Written[] = []
  const kernel: Kernel = {
    stat: () => stats[Math.min(takes, stats.length - 1)] ?? "",
    meminfo: () => meminfos[Math.min(takes, meminfos.length - 1)] ?? "",
  }
  const kept = (_root: string, page: string, value: number): undefined => {
    written.push({ page, value })
    return undefined
  }
  const take = takerOf(ROOT, PAGES, kernel, kept)
  const next = (): Sample => {
    const sample = take(NOW)
    takes += 1
    return sample
  }
  return { next, written }
}

test("the first sample answers no processor reading and a memory reading", () => {
  const { next, written } = scripted([stat(0, 100)], [meminfo(100, 60)])
  expect(next()).toEqual({ processor: null, memory: 40 })
  expect(written).toEqual([{ page: PAGES.memory, value: 40 }])
})

test("the second sample answers the share busy since the first", () => {
  const { next, written } = scripted([stat(0, 100), stat(30, 170)], [meminfo(100, 60)])
  next()
  expect(next()).toEqual({ processor: 30, memory: 40 })
  expect(written).toEqual([
    { page: PAGES.memory, value: 40 },
    { page: PAGES.processor, value: 30 },
  ])
})

test("a sample finding the percent the sample before found writes nothing", () => {
  const { next, written } = scripted(
    [stat(0, 100), stat(30, 170), stat(60, 240)],
    [meminfo(100, 60)]
  )
  next()
  next()
  next()
  expect(written).toEqual([
    { page: PAGES.memory, value: 40 },
    { page: PAGES.processor, value: 30 },
  ])
})

test("a share is kept as a whole percent", () => {
  expect(wholePercent(33.4)).toBe(33)
  expect(wholePercent(33.5)).toBe(34)
  expect(wholePercent(null)).toBeNull()
})

test("a sample finding no reading writes nothing and keeps the sample before for the next share", () => {
  const { next, written } = scripted([stat(0, 100), "", stat(50, 150)], [meminfo(100, 60), ""])
  next()
  expect(next()).toEqual({ processor: null, memory: null })
  expect(next()).toEqual({ processor: 50, memory: null })
  expect(written).toEqual([
    { page: PAGES.memory, value: 40 },
    { page: PAGES.processor, value: 50 },
  ])
})
