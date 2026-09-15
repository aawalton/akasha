import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  everyOfType,
  listedById,
  listedFor,
  listedWithin,
  readingIn,
  shapesEvery,
  shapesOfType,
  valueByPath,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  nothingFiled,
  scopedFiled,
  shapeAdded,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { indexAt, indexIn } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { bodyOf } from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"

const A = "01a04bdd-0000-7000-8000-00000000000a"
const B = "01a04bdd-0000-7000-8000-00000000000b"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rootAt(): string {
  return scratch.rootFor("akasha-reading-")
}

test("a page an address names is answered under the page type that address states", () => {
  const root = rootAt()
  const held = { path: "akasha/one/one.workspace-package.ts", id: A }
  listedFiled(root, "workspace-package", "one", [held])

  expect(
    listedFor(root, { pageTypeSlug: "workspace-package", propertySlug: "slug", value: "one" })
  ).toEqual(held)
  expect(listedFor(root, { pageTypeSlug: "domain", propertySlug: "slug", value: "one" })).toBe(null)
})

test("a page filed under one property is not answered under another of the same type", () => {
  const root = rootAt()
  const held = { path: "akasha/one/one.domain.ts", id: A }
  listedFiled(root, "domain", "one", [held])

  expect(listedFor(root, { pageTypeSlug: "domain", propertySlug: "slug", value: "one" })).toEqual(
    held
  )
  expect(listedFor(root, { pageTypeSlug: "domain", propertySlug: "bundle-id", value: "one" })).toBe(
    null
  )
})

test("an address naming a page by its id is answered by that id", () => {
  const root = rootAt()
  const held = { path: "akasha/a.module.ts", id: A }
  idFiled(root, A, [held])

  expect(listedFor(root, { id: A })).toEqual(held)
})

test("a page unique within a scope is answered under the page type and then the scope", () => {
  const root = rootAt()
  const held = { path: "akasha/inn/chapter-1.story-chapter-read.ts", id: A }
  scopedFiled(root, "story-chapter-read", "story-read-slug", "the-wandering-inn", "chapter-1", [
    held,
  ])

  expect(
    listedFor(root, {
      pageTypeSlug: "story-chapter-read",
      scopePropertySlug: "story-read-slug",
      scopeValue: "the-wandering-inn",
      propertySlug: "slug",
      value: "chapter-1",
    })
  ).toEqual(held)
})

test("a page carrying that value in another scope is not the page answered", () => {
  const root = rootAt()
  scopedFiled(root, "story-chapter-read", "story-read-slug", "the-wandering-inn", "chapter-1", [
    { path: "akasha/inn/chapter-1.story-chapter-read.ts", id: A },
  ])

  expect(
    listedFor(root, {
      pageTypeSlug: "story-chapter-read",
      scopePropertySlug: "story-read-slug",
      scopeValue: "the-last-orellia",
      propertySlug: "slug",
      value: "chapter-1",
    })
  ).toBe(null)
})

test("a scope named on its own is answered without an address being composed", () => {
  const root = rootAt()
  const held = { path: "akasha/inn/chapter-1.story-chapter-read.ts", id: A }
  scopedFiled(root, "story-chapter-read", "story-read-slug", "the-wandering-inn", "chapter-1", [
    held,
  ])

  expect(
    listedWithin(
      root,
      "story-chapter-read",
      "story-read-slug",
      "the-wandering-inn",
      "slug",
      "chapter-1"
    )
  ).toEqual([held])
})

test("an id the index carries is answered with the page carrying it", () => {
  const root = rootAt()
  idFiled(root, A, [{ path: "akasha/a.module.ts", id: A }])

  expect(listedById(root, A)).toEqual({ path: "akasha/a.module.ts", id: A })
  expect(listedById(root, B)).toBe(null)
})

test("an id directory standing nowhere under a standing index is nothing rather than a refusal", () => {
  const root = rootAt()
  nothingFiled(root)

  expect(listedById(root, A)).toBe(null)
})

test("every reader answers empty where the index holds nothing, whatever it was asked", () => {
  const root = rootAt()

  expect(listedById(root, A)).toBe(null)
  expect(everyOfType(root, "module")).toEqual([])
  expect(shapesOfType(root, "text-property").size).toBe(0)
  expect(shapesEvery(root).size).toBe(0)
})

test("an index's own place is answered under the index root", () => {
  expect(indexAt("held").startsWith(indexIn(""))).toBe(true)
  expect(indexAt("held", "page", "id")).toBe(`${indexAt("held")}/page/id`)
})

test("a reader answers alike whether it is given the root or a reading of the index", () => {
  const root = rootAt()
  idFiled(root, A, [{ path: "akasha/a.module.ts", id: A }])

  expect(listedById(readingIn(root), A)).toEqual(listedById(root, A))
})

test("every page of one page type is answered from the slugs filed under that page type", () => {
  const root = rootAt()
  const one = { path: "akasha/one/one.module.ts", id: A }
  const two = { path: "akasha/held/two.module.ts", id: B }
  listedFiled(root, "module", "one", [one])
  listedFiled(root, "module", "two", [two])

  expect(everyOfType(root, "module")).toEqual([two, one])
})

test("a page type whose slug is unique within a scope is answered from every scope's folder", () => {
  const root = rootAt()
  const one = { path: "akasha/a/one.section.ts", id: A }
  const two = { path: "akasha/b/two.section.ts", id: B }
  scopedFiled(root, "section", "section-of", "first", "one", [one])
  scopedFiled(root, "section", "section-of", "second", "two", [two])

  expect(everyOfType(root, "section")).toEqual([one, two])
})

test("the shape every page property of one page type has is that page type's file read", () => {
  const root = rootAt()
  shapeAdded(root, "text-property", "held", [{}])
  shapeAdded(root, "number-property", "counted", [{}])

  expect([...shapesOfType(root, "text-property").keys()]).toEqual(["held"])
  expect([...shapesOfType(root, "number-property").keys()]).toEqual(["counted"])
  expect([...shapesEvery(root).keys()].sort()).toEqual([
    "number-property/counted",
    "text-property/held",
  ])
})

test("a page type no page property is filed under is answered with no shape", () => {
  const root = rootAt()
  shapeAdded(root, "text-property", "held", [{}])

  expect([...shapesOfType(root, "url-property").keys()]).toEqual([])
})

test("the shapes of one page type are read once for a reading and that page type together", () => {
  const root = rootAt()
  shapeAdded(root, "text-property", "held", [{}])
  const reading = readingIn(root)

  expect(shapesOfType(reading, "text-property")).toBe(shapesOfType(reading, "text-property"))
})

test("a fixture writes a shape into the file beside that property's page type", () => {
  const root = rootAt()
  shapeAdded(root, "text-property", "held", [{ unique: "page" }])

  expect(readingIn(root).read("akasha/text-property.page-type.shapes.jsonl")).toBe(
    bodyOf([
      {
        pageTypeSlug: "text-property",
        targetPageTypeSlug: null,
        unique: "page",
        uniquePropertySlug: null,
        slug: "held",
        propertySlug: "held",
        fileName: null,
        folderName: null,
        sorted: false,
      },
    ])
  )
})

test("the values of one page type are worked out once for a reading and that page type", () => {
  const root = rootAt()
  valueAlsoFiled(root, "module", [
    { path: "akasha/one/one.module.ts", value: { id: A, slug: "one" } },
  ])
  const reading = readingIn(root)

  expect(valuesOfType(reading, "module")).toBe(valuesOfType(reading, "module"))
})

test("a reading made after a write answers the values the entry file carries now", () => {
  const root = rootAt()
  valueAlsoFiled(root, "module", [
    { path: "akasha/one/one.module.ts", value: { id: A, slug: "one" } },
  ])
  expect(valuesOfType(root, "module").map((one) => one.path)).toEqual(["akasha/one/one.module.ts"])
  valueAlsoFiled(root, "module", [
    { path: "akasha/held/two.module.ts", value: { id: B, slug: "two" } },
  ])

  expect(valuesOfType(root, "module").map((one) => one.path)).toEqual([
    "akasha/held/two.module.ts",
    "akasha/one/one.module.ts",
  ])
})

test("a poll over fresh readings sees the value a writer files while that poll runs", () => {
  const root = rootAt()
  valueAlsoFiled(root, "subagent", [
    { path: "akasha/a.subagent.ts", value: { id: A, agentId: "old" } },
  ])
  let saw: readonly string[] = []
  for (let tries = 0; tries < 5; tries += 1) {
    if (tries === 2) {
      valueAlsoFiled(root, "subagent", [
        { path: "akasha/b.subagent.ts", value: { id: B, agentId: "landed" } },
      ])
    }
    saw = valuesOfType(root, "subagent").map((one) => one.path)
    if (saw.length > 1) break
  }

  expect(saw).toEqual(["akasha/a.subagent.ts", "akasha/b.subagent.ts"])
})

test("a page a value is filed for is answered under its page type too", () => {
  const root = rootAt()
  valueAlsoFiled(root, "module", [
    { path: "akasha/one/one.module.ts", value: { id: A, pageTypeSlug: "module", slug: "one" } },
  ])

  expect(everyOfType(root, "module")).toEqual([{ path: "akasha/one/one.module.ts", id: A }])
})

test("a path whose body is not typescript carries no value, whatever that body holds", () => {
  const root = rootAt()
  const body = `export const one = { id: "${A}" } as const\n`
  mkdirSync(join(root, "akasha/one"), { recursive: true })
  writeFileSync(join(root, "akasha/one/one.module.held.jsonl"), body)
  writeFileSync(join(root, "akasha/one/one.module.ts"), body)

  expect(valueByPath(root, "akasha/one/one.module.held.jsonl")).toBe(null)
  expect(valueByPath(root, "akasha/one/one.module.ts")).toEqual({ id: A })
})
