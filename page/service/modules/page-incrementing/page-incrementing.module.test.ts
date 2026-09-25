import { expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { changeUncommitted } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import {
  type Incrementing,
  incrementIn,
  incrementing,
  type Landing,
} from "akasha/page/service/modules/page-incrementing/page-incrementing.module.code.ts"
import {
  BESIDE_AT,
  COUNTER_AT,
  counterRoot as rootFor,
} from "akasha/page/service/modules/page-incrementing/page-incrementing.module.test-fixtures.ts"
import { writerFor } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"

function asking(held: Partial<Incrementing> = {}): Incrementing {
  return {
    writer: "Amy <amy@alanwalton.com>",
    message: "a tap",
    pageTypeSlug: "counter",
    slug: "held-counter",
    key: "taps",
    by: 1,
    set: {},
    ...held,
  }
}

test("an increment that is no JSON object is refused", () => {
  expect(incrementIn([1])).toEqual({ refused: "an increment is a JSON object" })
})

test("an increment stating no amount is refused", () => {
  const said = incrementIn({ ...asking(), by: "one" })
  expect("refused" in said && said.refused).toContain("finite number")
})

test("an increment setting the key it counts is refused", () => {
  const said = incrementIn({ ...asking(), set: { taps: 4 } })
  expect("refused" in said && said.refused).toContain("not set as well")
})

test("an increment handed in whole is taken", () => {
  expect(incrementIn(asking())).toEqual({ incrementing: asking() })
})

test("a page holding no count is counted from zero", async () => {
  const root = rootFor()
  const said = await incrementing(root, writerFor({ root }), asking())
  expect(said).toEqual({ value: 1 })
  expect(readFileSync(join(root, BESIDE_AT), "utf8")).toContain('"taps": 1')
})

test("an increment adds the amount it states", async () => {
  const root = rootFor()
  const writer = writerFor({ root })
  await incrementing(root, writer, asking({ by: 5 }))
  expect(await incrementing(root, writer, asking({ by: 5 }))).toEqual({ value: 10 })
})

test("values set with an increment are written in the same step", async () => {
  const root = rootFor()
  const at = "2026-09-24T12:00:00.000Z"
  await incrementing(root, writerFor({ root }), asking({ set: { lastTappedAt: at } }))
  const beside = readFileSync(join(root, BESIDE_AT), "utf8")
  expect(beside).toContain('"taps": 1')
  expect(beside).toContain(at)
})

test("a count that is no number is refused rather than counted from zero", async () => {
  const root = rootFor()
  changeUncommitted(root, COUNTER_AT, () => ({ taps: "many" }))
  const said = await incrementing(root, writerFor({ root }), asking())
  expect("refused" in said && said.refused).toContain("rather than a number")
  expect("refused" in said && said.fault).toBe("service")
  expect(readFileSync(join(root, BESIDE_AT), "utf8")).toContain('"taps": "many"')
})

test("an increment reaching no page answers no count", async () => {
  const root = rootFor()
  expect(await incrementing(root, writerFor({ root }), asking({ slug: "no-counter" }))).toEqual({
    value: null,
  })
})

test("an increment to a key the page type declares nowhere is refused", async () => {
  const root = rootFor()
  const said = await incrementing(root, writerFor({ root }), asking({ key: "clicks" }))
  expect("refused" in said && said.refused).toContain("declares no property carried as `clicks`")
  expect("refused" in said && said.fault).toBe("caller")
})

test("a landing refused as a race refuses the increment as a race", async () => {
  const root = rootFor()
  const racing: Landing = () => Promise.resolve({ refused: "moved", fault: "race" })
  const said = await incrementing(root, writerFor({ root }), asking({ key: "presses" }), racing)
  expect("refused" in said && said.fault).toBe("race")
})

test("many increments arriving at once are each counted", async () => {
  const root = rootFor()
  const writer = writerFor({ root })
  const many = 50
  const said = await Promise.all(
    Array.from({ length: many }, () => incrementing(root, writer, asking()))
  )
  const counts = said.map((one) => ("value" in one ? one.value : null))
  expect(new Set(counts).size).toBe(many)
  expect(Math.max(...counts.map((one) => one ?? 0))).toBe(many)
  expect(readFileSync(join(root, BESIDE_AT), "utf8")).toContain(`"taps": ${many}`)
})

const onDisk: Landing = (root, batch) => {
  for (const one of batch) {
    for (const put of one.puts ?? []) writeFileSync(join(root, put.path), put.content, "utf8")
  }
  return Promise.resolve({ commit: null, wrote: [], took: [] })
}

test("an increment to a value kept in the commit lands in the page", async () => {
  const root = rootFor()
  const writer = writerFor({ root })
  await incrementing(root, writer, asking({ key: "presses" }), onDisk)
  const said = await incrementing(root, writer, asking({ key: "presses" }), onDisk)
  expect(said).toEqual({ value: 2 })
  expect(readFileSync(join(root, COUNTER_AT), "utf8")).toContain("presses: 2")
})

test("many increments to a value kept in the commit arriving at once are each counted", async () => {
  const root = rootFor()
  const writer = writerFor({ root })
  const many = 20
  await Promise.all(
    Array.from({ length: many }, () =>
      incrementing(root, writer, asking({ key: "presses" }), onDisk)
    )
  )
  expect(readFileSync(join(root, COUNTER_AT), "utf8")).toContain(`presses: ${many}`)
})
