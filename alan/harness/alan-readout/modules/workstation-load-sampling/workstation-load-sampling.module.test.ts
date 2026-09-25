import { afterAll, expect, test } from "bun:test"
import {
  type Kernel,
  readingCodeOf,
  type Sampled,
  samplersOf,
  takerOf,
} from "akasha/alan/harness/alan-readout/modules/workstation-load-sampling/workstation-load-sampling.module.code.ts"
import { workstationLoadSampling } from "akasha/alan/harness/alan-readout/modules/workstation-load-sampling/workstation-load-sampling.module.ts"
import { readout } from "akasha/alan/harness/readout/readout.page-type.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/system/modules/scratching/scratching.module.test-fixtures.ts"
import { nothingFiled } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const made = scratchWorld()

afterAll(() => made.sweep())

const ROOT = "/nowhere"

const NOW = new Date("2026-09-14T12:00:00.000Z")

const FIRST = "probe/first/first.readout.ts"

const SECOND = "probe/second/second.readout.ts"

const ELSEWHERE = "probe/elsewhere/elsewhere.readout.ts"

const KERNEL: Kernel = { stat: () => "", meminfo: () => "" }

type Written = { readonly page: string; readonly value: number }

function scripted(sampled: readonly Sampled[]) {
  const written: Written[] = []
  const kept = (_root: string, page: string, value: number): undefined => {
    written.push({ page, value })
    return undefined
  }
  return { take: takerOf(ROOT, sampled, KERNEL, kept), written }
}

function answering(...values: readonly (number | null)[]): Sampled["sample"] {
  let at = 0
  return () => {
    const value = values[Math.min(at, values.length - 1)] ?? null
    at += 1
    return value
  }
}

test("a sample keeps each readout's reading beside that readout", () => {
  const { take, written } = scripted([
    { page: FIRST, sample: answering(30) },
    { page: SECOND, sample: answering(40) },
  ])
  expect(take(NOW)).toEqual({ [FIRST]: 30, [SECOND]: 40 })
  expect(written).toEqual([
    { page: FIRST, value: 30 },
    { page: SECOND, value: 40 },
  ])
})

test("a sample finding the reading the sample before found writes nothing", () => {
  const { take, written } = scripted([{ page: FIRST, sample: answering(30, 30, 31) }])
  take(NOW)
  take(NOW)
  take(NOW)
  expect(written).toEqual([
    { page: FIRST, value: 30 },
    { page: FIRST, value: 31 },
  ])
})

test("a sample finding no reading writes nothing", () => {
  const { take, written } = scripted([{ page: FIRST, sample: answering(null) }])
  expect(take(NOW)).toEqual({ [FIRST]: null })
  expect(written).toEqual([])
})

test("a readout's reading code sits beside its page under the reading property", () => {
  expect(readingCodeOf(FIRST)).toBe("probe/first/first.readout.reading.code.ts")
})

test("the readouts sampled are those whose pages name this module, each by its own reading code", async () => {
  const root = made.rootFor("workstation-load-sampling-")
  nothingFiled(root)
  const served = namedAs(module.slug, workstationLoadSampling.slug, null)
  const filed = (path: string, servedBy: string, value: number, id: string): undefined => {
    writing(
      root,
      path,
      `export const it = { type: "${pageType.slug}/${readout.slug}", servedBy: ["${servedBy}"] }\n`
    )
    writing(root, readingCodeOf(path), `export function sampler() {\n  return () => ${value}\n}\n`)
    listedFiled(root, readout.slug, path.split("/").at(-2) ?? "", [{ path, id }])
    return undefined
  }
  filed(FIRST, served, 7, "01a0d9c0-0000-7000-8000-000000000010")
  filed(ELSEWHERE, "module/other-sampling", 9, "01a0d9c0-0000-7000-8000-000000000011")
  const sampled = await samplersOf(root)
  expect(sampled.map((one) => one.page)).toEqual([FIRST])
  expect(sampled[0]?.sample(KERNEL)).toBe(7)
})
