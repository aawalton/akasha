import { afterAll, expect, test } from "bun:test"
import { mkdirSync } from "node:fs"
import {
  shapeOf,
  shapesAt,
} from "akasha/pages/indexes/property-shaping/property-shaping.module.code.ts"
import { readingIn } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { shapeAdded } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { indexIn } from "akasha/pages/indexes/surface/index-surface.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function declaring(prefix: string, said: readonly unknown[]): string {
  const root = scratch.rootFor(prefix)
  mkdirSync(indexIn(root), { recursive: true })
  for (const one of said) {
    const held = one as Record<string, unknown>
    const kind = held.pageTypeSlug
    const slug = held.slug
    if (typeof kind !== "string" || typeof slug !== "string") continue
    shapeAdded(root, kind, slug, [held])
  }
  return root
}

const PART_SLUGS = {
  pageTypeSlug: "relation-property",
  targetPageTypeSlug: "domain",
  unique: null,
  uniquePropertySlug: null,
  slug: "part-slugs",
  propertySlug: "part-slugs",
  fileName: null,
  folderName: null,
}

const TEXT_FOO = { ...PART_SLUGS, pageTypeSlug: "text-property", slug: "foo", propertySlug: "foo" }

const NUMBER_FOO = { ...TEXT_FOO, pageTypeSlug: "number-property" }

test("a property is keyed by the page type it is and then its own slug", () => {
  const root = declaring("akasha-shaping-keyed-", [TEXT_FOO, NUMBER_FOO])

  expect([...shapesAt(root).keys()].sort()).toEqual(["number-property/foo", "text-property/foo"])
})

test("a value saying nothing of a field carries that field as null", () => {
  const root = declaring("akasha-shaping-null-", [
    { pageTypeSlug: "relation-property", slug: "held", propertySlug: "held" },
  ])
  const one = shapesAt(root).get("relation-property/held")

  expect(one?.targetPageTypeSlug).toBe(null)
  expect(one?.unique).toBe(null)
  expect(one?.fileName).toBe(null)
  expect(one?.folderName).toBe(null)
})

test("a value carries the key a page reads the property by", () => {
  const root = declaring("akasha-shaping-key-", [
    { pageTypeSlug: "text-property", slug: "held-name", propertySlug: "named" },
  ])

  expect(shapesAt(root).get("text-property/held-name")?.propertySlug).toBe("named")
})

test("the first value a property is filed under answers for that property", () => {
  const root = declaring("akasha-shaping-first-", [
    { pageTypeSlug: "text-property", slug: "held", propertySlug: "first" },
    { pageTypeSlug: "text-property", slug: "held", propertySlug: "second" },
  ])

  expect(shapesAt(root).get("text-property/held")?.propertySlug).toBe("first")
})

test("a page of one of those kinds stating no property slug carries no shape", () => {
  const root = declaring("akasha-shaping-odd-", [
    { pageTypeSlug: "text-property", slug: "loose", propertySlug: null },
    { pageTypeSlug: "text-property", slug: "held", propertySlug: "held" },
  ])

  expect([...shapesAt(root).keys()]).toEqual(["text-property/held"])
})

test("every shape is read once for a reading and held", () => {
  const root = declaring("akasha-shaping-held-", [TEXT_FOO])
  const reading = readingIn(root)
  const first = shapesAt(reading)

  expect(shapesAt(reading)).toBe(first)
})

test("a name saying its page type is answered with the shape filed under that page type", () => {
  const root = declaring("akasha-shaping-named-", [PART_SLUGS])

  expect(shapeOf(root, "relation-property/part-slugs")).toEqual({ shape: PART_SLUGS })
})

test("a name saying its page type passes over another page type carrying the slug", () => {
  const root = declaring("akasha-shaping-apart-", [TEXT_FOO, NUMBER_FOO])

  expect(shapeOf(root, "number-property/foo")).toEqual({ shape: NUMBER_FOO })
})

test("a bare slug one page type carries is answered with that shape", () => {
  const root = declaring("akasha-shaping-bare-", [TEXT_FOO])

  expect(shapeOf(root, "foo")).toEqual({ shape: TEXT_FOO })
})

test("a bare slug two page types carry is refused and must name its page type", () => {
  const root = declaring("akasha-shaping-narrow-", [TEXT_FOO, NUMBER_FOO])

  expect(shapeOf(root, "foo")).toEqual({
    refused:
      "`foo` narrows to 2 page properties and must name its page type — " +
      "number-property/foo, text-property/foo",
  })
})

test("a slug no shape carries is refused rather than answered as nothing", () => {
  const root = declaring("akasha-shaping-nowhere-", [TEXT_FOO])

  expect(shapeOf(root, "text-property/nowhere")).toEqual({
    refused: "no page property carries the slug `nowhere`",
  })
})

test("a page type carrying no property of the slug is refused as well", () => {
  const root = declaring("akasha-shaping-elsewhere-", [TEXT_FOO])

  expect(shapeOf(root, "number-property/foo")).toEqual({
    refused: "no page property carries the slug `foo`",
  })
})

test("a name reaching a page by id is refused, a property being named by its slug", () => {
  const root = declaring("akasha-shaping-id-", [TEXT_FOO])
  const said = shapeOf(root, "01a04bdd-0000-7000-8000-00000000000a")

  expect("refused" in said && said.refused).toContain("named by its slug")
})

test("an index filing no shape refuses the name rather than the reading", () => {
  const root = declaring("akasha-shaping-empty-", [])

  expect(shapeOf(root, "text-property/nowhere")).toEqual({
    refused: "no page property carries the slug `nowhere`",
  })
})

test("a name is refused where the index itself is not there", () => {
  const root = scratch.rootFor("akasha-shaping-cold-")

  expect(() => shapeOf(root, "text-property/foo")).toThrow(/is not an index naming none/)
})
