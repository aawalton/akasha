import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import { DECLARING_AT } from "akasha/pages/indexes/declaring/index-declaring.index.code.ts"
import { shapesAt } from "akasha/pages/indexes/property-shaping/property-shaping.module.code.ts"
import { readingAt } from "akasha/pages/indexes/surface/index-surface.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function declaring(prefix: string, said: readonly Record<string, unknown>[]): string {
  const index = scratch.rootFor(prefix)
  const at = join(index, DECLARING_AT)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, said.map((one) => `${JSON.stringify(one)}\n`).join(""), "utf8")
  return index
}

test("a property is keyed by the page type it is and then its own slug", () => {
  const index = declaring("akasha-shaping-keyed-", [
    { pageTypeSlug: "text-property", slug: "foo", propertySlug: "foo" },
    { pageTypeSlug: "number-property", slug: "foo", propertySlug: "foo" },
  ])

  expect([...shapesAt(readingAt(index)).keys()].sort()).toEqual([
    "number-property/foo",
    "text-property/foo",
  ])
})

test("a line saying nothing of a field carries that field as null", () => {
  const index = declaring("akasha-shaping-null-", [
    { pageTypeSlug: "relation-property", slug: "held", propertySlug: "held" },
  ])
  const one = shapesAt(readingAt(index)).get("relation-property/held")

  expect(one?.targetPageTypeSlug).toBe(null)
  expect(one?.unique).toBe(null)
  expect(one?.fileName).toBe(null)
  expect(one?.folderName).toBe(null)
})

test("a line carries the key a page reads the property by", () => {
  const index = declaring("akasha-shaping-key-", [
    { pageTypeSlug: "text-property", slug: "held-name", propertySlug: "named" },
  ])

  expect(shapesAt(readingAt(index)).get("text-property/held-name")?.propertySlug).toBe("named")
})

test("the first line a property is filed under answers for that property", () => {
  const index = declaring("akasha-shaping-first-", [
    { pageTypeSlug: "text-property", slug: "held", propertySlug: "first" },
    { pageTypeSlug: "text-property", slug: "held", propertySlug: "second" },
  ])

  expect(shapesAt(readingAt(index)).get("text-property/held")?.propertySlug).toBe("first")
})

test("a line that is no record is left out rather than refusing the rest", () => {
  const index = declaring("akasha-shaping-odd-", [
    { pageTypeSlug: "text-property", slug: "held", propertySlug: "held" },
  ])
  const at = join(index, DECLARING_AT)
  writeFileSync(at, `[1,2]\n${JSON.stringify({ pageTypeSlug: "text-property", slug: "held" })}\n`)

  expect([...shapesAt(readingAt(index)).keys()]).toEqual(["text-property/held"])
})

test("every shape is read once for a reading and held", () => {
  const index = declaring("akasha-shaping-held-", [
    { pageTypeSlug: "text-property", slug: "held", propertySlug: "held" },
  ])
  const reading = readingAt(index)
  const first = shapesAt(reading)

  expect(shapesAt(reading)).toBe(first)
})
