import { afterAll, expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import { valueAt } from "../../indexes/index-entries/index-entries.module.code.ts"
import {
  schemaFiled,
  standingFiled,
} from "../../indexes/index-reading/index-reading.module.test-fixtures.ts"
import { type Carried, declarationsOf, propertiesOf } from "./page-type-properties.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function typed(
  root: string,
  slug: string,
  above: string | null,
  declared: readonly Record<string, unknown>[]
): undefined {
  const path = `akasha/held/${slug}.page-type.ts`
  standingFiled(root, "page-type", slug, [{ path, id: `id-${slug}` }])
  const page = join(root, path)
  mkdirSync(dirname(page), { recursive: true })
  const said = above === null ? "null" : JSON.stringify(`page-type/${above}`)
  writeFileSync(
    page,
    `export const held = { slug: ${JSON.stringify(slug)}, extendsSlug: ${said},` +
      ` properties: ${JSON.stringify(declared)} }\n`
  )
}

function propertied(
  root: string,
  pageTypeSlug: string,
  slug: string,
  propertySlug: string
): undefined {
  schemaFiled(root, pageTypeSlug, slug, [
    { pageTypeSlug, targetPageTypeSlug: null, unique: null, slug, propertySlug },
  ])
}

function carriedBy(root: string, slug: string): readonly Carried[] {
  return propertiesOf(slug, root, (path) => valueAt(path, root))
}

function declaredIn(root: string, slug: string): readonly Carried[] {
  return declarationsOf(slug, root, (path) => valueAt(path, root))
}

function rootAt(): string {
  return scratch.rootFor("akasha-properties-")
}

test("a page type carries the properties it declares itself", () => {
  const root = rootAt()
  propertied(root, "text-property", "plural-slug", "plural-slug")
  typed(root, "page-type", null, [
    { pagePropertySlug: "plural-slug", required: true, many: true, max: 20 },
  ])

  expect(carriedBy(root, "page-type")).toEqual([
    {
      pagePropertySlug: "plural-slug",
      pageTypeSlug: "text-property",
      propertySlug: "plural-slug",
      key: "pluralSlug",
      declaredBy: "page-type",
      required: true,
      many: true,
      max: 20,
      total: null,
      uncommitted: false,
    },
  ])
})

test("a page type carries what every type above it declares, its own coming first", () => {
  const root = rootAt()
  propertied(root, "text-property", "slug", "slug")
  propertied(root, "text-property", "definition", "definition")
  propertied(root, "text-property", "plural-slug", "plural-slug")
  typed(root, "page", null, [{ pagePropertySlug: "slug", required: true, many: false }])
  typed(root, "domain", "page", [{ pagePropertySlug: "definition", required: true, many: false }])
  typed(root, "page-type", "domain", [
    { pagePropertySlug: "plural-slug", required: true, many: false },
  ])

  expect(carriedBy(root, "page-type").map((one) => [one.key, one.declaredBy])).toEqual([
    ["pluralSlug", "page-type"],
    ["definition", "domain"],
    ["slug", "page"],
  ])
})

test("the nearest declaration binds, and a further one for the property is passed over", () => {
  const root = rootAt()
  propertied(root, "record-property", "properties", "properties")
  typed(root, "domain", null, [
    { pagePropertySlug: "properties", required: false, many: true, max: null },
  ])
  typed(root, "page-type", "domain", [
    { pagePropertySlug: "properties", required: true, many: true, max: 20 },
  ])

  const carried = carriedBy(root, "page-type")

  expect(carried).toHaveLength(1)
  expect(carried[0]?.declaredBy).toBe("page-type")
  expect(carried[0]?.required).toBe(true)
  expect(carried[0]?.max).toBe(20)
})

test("a declaration reaching no page property is left out rather than keyed by what it states", () => {
  const root = rootAt()
  propertied(root, "text-property", "plural-slug", "plural-slug")
  typed(root, "page-type", null, [
    { pagePropertySlug: "plural-slug", required: true, many: false },
    { pagePropertySlug: "nowhere", required: true, many: false },
  ])

  expect(carriedBy(root, "page-type").map((one) => one.key)).toEqual(["pluralSlug"])
})

test("two properties landing on one key are both answered, the collision left to be judged", () => {
  const root = rootAt()
  propertied(root, "text-property", "held-name", "held")
  propertied(root, "number-property", "held-count", "held")
  typed(root, "page-type", null, [
    { pagePropertySlug: "held-name", required: true, many: false },
    { pagePropertySlug: "held-count", required: false, many: false },
  ])

  expect(carriedBy(root, "page-type").map((one) => [one.pagePropertySlug, one.key])).toEqual([
    ["held-name", "held"],
    ["held-count", "held"],
  ])
})

test("one slug under two page types is two properties, each binding on its own", () => {
  const root = rootAt()
  propertied(root, "text-property", "foo", "foo-text")
  propertied(root, "number-property", "foo", "foo-count")
  typed(root, "domain", null, [
    { pagePropertySlug: "number-property/foo", required: false, many: false },
  ])
  typed(root, "page-type", "domain", [
    { pagePropertySlug: "text-property/foo", required: true, many: false },
  ])

  expect(carriedBy(root, "page-type").map((one) => [one.pageTypeSlug, one.key])).toEqual([
    ["text-property", "fooText"],
    ["number-property", "fooCount"],
  ])
})

test("a declaration restating an inherited property qualified binds once, the nearest one", () => {
  const root = rootAt()
  propertied(root, "text-property", "definition", "definition")
  typed(root, "domain", null, [{ pagePropertySlug: "definition", required: false, many: false }])
  typed(root, "page-type", "domain", [
    { pagePropertySlug: "text-property/definition", required: true, many: false },
  ])

  const carried = carriedBy(root, "page-type")

  expect(carried).toHaveLength(1)
  expect(carried[0]?.declaredBy).toBe("page-type")
  expect(carried[0]?.required).toBe(true)
})

test("a page type standing above itself is walked once rather than forever", () => {
  const root = rootAt()
  propertied(root, "text-property", "slug", "slug")
  typed(root, "a", "b", [{ pagePropertySlug: "slug", required: true, many: false }])
  typed(root, "b", "a", [])

  expect(carriedBy(root, "a").map((one) => one.key)).toEqual(["slug"])
})

test("a page type the index does not name is answered with nothing rather than by throwing", () => {
  const root = rootAt()

  expect(carriedBy(root, "nowhere")).toEqual([])
})

test("every declaration is answered, the shadowed one standing beside the one that binds", () => {
  const root = rootAt()
  propertied(root, "record-property", "properties", "properties")
  typed(root, "domain", null, [
    { pagePropertySlug: "properties", required: false, many: true, max: null },
  ])
  typed(root, "page-type", "domain", [
    { pagePropertySlug: "properties", required: true, many: true, max: 20 },
  ])

  expect(declaredIn(root, "page-type").map((one) => [one.declaredBy, one.key, one.max])).toEqual([
    ["page-type", "properties", 20],
    ["domain", "properties", null],
  ])
})

test("a shadowed declaration keeps the required it states, not the one that binds", () => {
  const root = rootAt()
  propertied(root, "text-property", "definition", "definition")
  typed(root, "domain", null, [{ pagePropertySlug: "definition", required: false, many: false }])
  typed(root, "page-type", "domain", [
    { pagePropertySlug: "text-property/definition", required: true, many: false },
  ])

  expect(declaredIn(root, "page-type").map((one) => one.required)).toEqual([true, false])
})

test("a declaration reaching no page property is left out of the declarations as well", () => {
  const root = rootAt()
  propertied(root, "text-property", "plural-slug", "plural-slug")
  typed(root, "page-type", null, [
    { pagePropertySlug: "plural-slug", required: true, many: false },
    { pagePropertySlug: "nowhere", required: true, many: false },
  ])

  expect(declaredIn(root, "page-type").map((one) => one.key)).toEqual(["pluralSlug"])
})

test("what binds is the first of the declarations, and the rest are answered here alone", () => {
  const root = rootAt()
  propertied(root, "text-property", "definition", "definition")
  propertied(root, "text-property", "plural-slug", "plural-slug")
  typed(root, "page", null, [{ pagePropertySlug: "definition", required: false, many: false }])
  typed(root, "domain", "page", [
    { pagePropertySlug: "text-property/definition", required: true, many: false },
  ])
  typed(root, "page-type", "domain", [
    { pagePropertySlug: "plural-slug", required: true, many: false },
  ])

  expect(declaredIn(root, "page-type").map((one) => one.declaredBy)).toEqual([
    "page-type",
    "domain",
    "page",
  ])
  expect(carriedBy(root, "page-type").map((one) => one.declaredBy)).toEqual(["page-type", "domain"])
})
