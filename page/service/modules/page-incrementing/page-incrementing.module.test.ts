import { expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  idOf,
  indexedRepo,
  pageOf,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { changeUncommitted } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import {
  type Incrementing,
  incrementIn,
  incrementing,
  type Landing,
} from "akasha/page/service/modules/page-incrementing/page-incrementing.module.code.ts"
import { writerFor } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

type Held = Record<string, unknown>

const seed = (one: string): string => `01a0a300-0000-7000-8000-0000000000${one}`

const COUNTER_AT = "akasha/counter/pages/held-counter.counter.ts"

const BESIDE_AT = "akasha/counter/pages/held-counter.counter.uncommitted.ts"

const TYPES_AT = "akasha/counter/counter.page-type.types.ts"

function aProperty(one: string, slug: string): [string, string] {
  const value = { id: seed(one), type: "text-property", slug, propertySlug: slug }
  return [`akasha/${slug}.text-property.ts`, pageOf(value)]
}

function counted(pageProperty: string, uncommitted = false): Held {
  const held: Held = { pageProperty, required: false, many: false }
  return uncommitted ? { ...held, uncommitted } : held
}

function rootFor(): string {
  return indexedRepo({
    ...Object.fromEntries([
      aProperty("02", "type"),
      aProperty("03", "title"),
      aProperty("04", "presses"),
      aProperty("05", "taps"),
      aProperty("06", "last-tapped-at"),
    ]),
    "akasha/page.page-type.ts": pageOf({
      id: idOf("1"),
      type: "page-type",
      slug: "page",
      extends: [],
      properties: [counted("id"), counted("slug")],
    }),
    "akasha/counter/counter.page-type.ts": pageOf({
      id: seed("10"),
      type: "page-type",
      slug: "counter",
      extends: [`${pageType.slug}/${page.slug}`],
      types: "ts",
      properties: [
        counted("type"),
        counted("title"),
        counted("presses"),
        counted("taps", true),
        counted("last-tapped-at", true),
      ],
    }),
    [TYPES_AT]: "export type Counter = Record<string, unknown>\n",
    [COUNTER_AT]: `import type { Counter } from "akasha/${TYPES_AT}"

export const heldCounter = {
  id: "${seed("20")}",
  type: "page-type/counter",
  slug: "held-counter",
  title: "a counter",
} as const satisfies Counter
`,
  })
}

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
