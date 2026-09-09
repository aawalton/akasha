import { afterAll, expect, test } from "bun:test"
import { valueAt } from "../../value/page-value.module.code.ts"
import { propertiesIfNamed, sourceIn } from "./declared-properties.module.code.ts"
import {
  carriedBy,
  declaredIn,
  propertied,
  rootAt,
  scratch,
  typed,
} from "./declared-properties.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a page type carries the properties it declares itself", () => {
  const root = rootAt()
  propertied(root, "text-property", "plural-slug", "plural-slug")
  typed(root, "page-type", null, [
    { pagePropertySlug: "plural-slug", required: true, many: true, maxCount: 20 },
  ])

  expect(carriedBy(root, "page-type")).toEqual([
    {
      pagePropertySlug: "plural-slug",
      pageTypeSlug: "text-property",
      propertySlug: "plural-slug",
      key: "pluralSlug",
      unique: null,
      declaredBy: "page-type",
      required: true,
      many: true,
      maxCount: 20,
      maxLength: null,
      uncommitted: false,
      secret: false,
    },
  ])
})

test("a page type carries what every type above it declares, its own coming first", () => {
  const root = rootAt()
  propertied(root, "text-property", "slug", "slug")
  propertied(root, "text-property", "definition", "definition")
  propertied(root, "text-property", "plural-slug", "plural-slug")
  typed(root, "page", null, [{ pagePropertySlug: "slug", required: true, many: false }])
  typed(root, "domain", ["page"], [{ pagePropertySlug: "definition", required: true, many: false }])
  typed(
    root,
    "page-type",
    ["domain"],
    [{ pagePropertySlug: "plural-slug", required: true, many: false }]
  )

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
    { pagePropertySlug: "properties", required: false, many: true, maxCount: null },
  ])
  typed(
    root,
    "page-type",
    ["domain"],
    [{ pagePropertySlug: "properties", required: true, many: true, maxCount: 20 }]
  )

  const carried = carriedBy(root, "page-type")

  expect(carried).toHaveLength(1)
  expect(carried[0]?.declaredBy).toBe("page-type")
  expect(carried[0]?.required).toBe(true)
  expect(carried[0]?.maxCount).toBe(20)
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
  typed(
    root,
    "page-type",
    ["domain"],
    [{ pagePropertySlug: "text-property/foo", required: true, many: false }]
  )

  expect(carriedBy(root, "page-type").map((one) => [one.pageTypeSlug, one.key])).toEqual([
    ["text-property", "fooText"],
    ["number-property", "fooCount"],
  ])
})

test("a declaration restating an inherited property qualified binds once, the nearest one", () => {
  const root = rootAt()
  propertied(root, "standard-agent-english-property", "definition", "definition")
  typed(root, "domain", null, [{ pagePropertySlug: "definition", required: false, many: false }])
  typed(
    root,
    "page-type",
    ["domain"],
    [
      {
        pagePropertySlug: "standard-agent-english-property/definition",
        required: true,
        many: false,
      },
    ]
  )

  const carried = carriedBy(root, "page-type")

  expect(carried).toHaveLength(1)
  expect(carried[0]?.declaredBy).toBe("page-type")
  expect(carried[0]?.required).toBe(true)
})

test("a declaration narrowing `unique` binds over the kind its property states", () => {
  const root = rootAt()
  propertied(root, "text-property", "slug", "slug", "page-type")
  typed(root, "page", null, [{ pagePropertySlug: "slug", required: true, many: false }])
  typed(
    root,
    "route",
    ["page"],
    [{ pagePropertySlug: "slug", required: true, many: false, unique: "page-property" }]
  )

  expect(carriedBy(root, "route").map((one) => one.unique)).toEqual(["page-property"])
  expect(carriedBy(root, "page").map((one) => one.unique)).toEqual(["page-type"])
})

test("a page type standing above itself is walked once rather than forever", () => {
  const root = rootAt()
  propertied(root, "text-property", "slug", "slug")
  typed(root, "a", ["b"], [{ pagePropertySlug: "slug", required: true, many: false }])
  typed(root, "b", ["a"], [])

  expect(carriedBy(root, "a").map((one) => one.key)).toEqual(["slug"])
})

test("a page type the index does not name is refused by name rather than answered as empty", () => {
  const root = rootAt()
  typed(root, "held", null, [])

  expect(() => carriedBy(root, "nowhere")).toThrow("`nowhere` names no page type here")
  expect(
    propertiesIfNamed(
      "nowhere",
      sourceIn(root, (path) => valueAt(path, root))
    )
  ).toBe(null)
})

test("every declaration is answered, the shadowed one standing beside the one that binds", () => {
  const root = rootAt()
  propertied(root, "record-property", "properties", "properties")
  typed(root, "domain", null, [
    { pagePropertySlug: "properties", required: false, many: true, maxCount: null },
  ])
  typed(
    root,
    "page-type",
    ["domain"],
    [{ pagePropertySlug: "properties", required: true, many: true, maxCount: 20 }]
  )

  expect(
    declaredIn(root, "page-type").map((one) => [one.declaredBy, one.key, one.maxCount])
  ).toEqual([
    ["page-type", "properties", 20],
    ["domain", "properties", null],
  ])
})

test("a shadowed declaration keeps the required it states, not the one that binds", () => {
  const root = rootAt()
  propertied(root, "standard-agent-english-property", "definition", "definition")
  typed(root, "domain", null, [{ pagePropertySlug: "definition", required: false, many: false }])
  typed(
    root,
    "page-type",
    ["domain"],
    [
      {
        pagePropertySlug: "standard-agent-english-property/definition",
        required: true,
        many: false,
      },
    ]
  )

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
  propertied(root, "standard-agent-english-property", "definition", "definition")
  propertied(root, "text-property", "plural-slug", "plural-slug")
  typed(root, "page", null, [{ pagePropertySlug: "definition", required: false, many: false }])
  typed(
    root,
    "domain",
    ["page"],
    [
      {
        pagePropertySlug: "standard-agent-english-property/definition",
        required: true,
        many: false,
      },
    ]
  )
  typed(
    root,
    "page-type",
    ["domain"],
    [{ pagePropertySlug: "plural-slug", required: true, many: false }]
  )

  expect(declaredIn(root, "page-type").map((one) => one.declaredBy)).toEqual([
    "page-type",
    "domain",
    "page",
  ])
  expect(carriedBy(root, "page-type").map((one) => one.declaredBy)).toEqual(["page-type", "domain"])
})

test("a declaration saying its value is secret carries that, and one saying nothing does not", () => {
  const root = rootAt()
  propertied(root, "text-property", "access-token", "access-token")
  propertied(root, "text-property", "plural-slug", "plural-slug")
  typed(root, "page-type", null, [
    { pagePropertySlug: "access-token", required: true, many: false, secret: true },
    { pagePropertySlug: "plural-slug", required: true, many: false },
  ])

  expect(carriedBy(root, "page-type").map((one) => [one.key, one.secret])).toEqual([
    ["accessToken", true],
    ["pluralSlug", false],
  ])
})

test("secret and uncommitted are separate, and one declaration may carry both", () => {
  const root = rootAt()
  propertied(root, "text-property", "rescued", "rescued")
  typed(root, "page-type", null, [
    { pagePropertySlug: "rescued", required: false, many: false, uncommitted: true, secret: true },
  ])

  const carried = carriedBy(root, "page-type")

  expect(carried).toHaveLength(1)
  expect(carried[0]?.uncommitted).toBe(true)
  expect(carried[0]?.secret).toBe(true)
})

test("where two types above are equally near, the one named last binds", () => {
  const root = rootAt()
  propertied(root, "text-property", "definition", "definition")
  typed(root, "module", null, [{ pagePropertySlug: "definition", required: false, many: false }])
  typed(root, "page-property", null, [
    { pagePropertySlug: "definition", required: true, many: false },
  ])
  typed(root, "computed-property", ["module", "page-property"], [])

  const carried = carriedBy(root, "computed-property")

  expect(carried).toHaveLength(1)
  expect(carried[0]?.declaredBy).toBe("page-property")
  expect(carried[0]?.required).toBe(true)
  expect(declaredIn(root, "computed-property").map((one) => one.declaredBy)).toEqual([
    "page-property",
    "module",
  ])
})

test("a type one step up binds over one two steps up, though the further was named later", () => {
  const root = rootAt()
  propertied(root, "text-property", "definition", "definition")
  typed(root, "page", null, [{ pagePropertySlug: "definition", required: false, many: false }])
  typed(root, "page-property", ["page"], [])
  typed(root, "module", null, [{ pagePropertySlug: "definition", required: true, many: false }])
  typed(root, "computed-property", ["module", "page-property"], [])

  const carried = carriedBy(root, "computed-property")

  expect(carried).toHaveLength(1)
  expect(carried[0]?.declaredBy).toBe("module")
  expect(carried[0]?.required).toBe(true)
  expect(declaredIn(root, "computed-property").map((one) => one.declaredBy)).toEqual([
    "module",
    "page",
  ])
})

test("what a page type declares itself binds over both of the types it names above", () => {
  const root = rootAt()
  propertied(root, "text-property", "definition", "definition")
  typed(root, "module", null, [{ pagePropertySlug: "definition", required: false, many: false }])
  typed(root, "page-property", null, [
    { pagePropertySlug: "definition", required: false, many: false },
  ])
  typed(
    root,
    "computed-property",
    ["module", "page-property"],
    [{ pagePropertySlug: "definition", required: true, many: false }]
  )

  const carried = carriedBy(root, "computed-property")

  expect(carried).toHaveLength(1)
  expect(carried[0]?.declaredBy).toBe("computed-property")
  expect(carried[0]?.required).toBe(true)
  expect(declaredIn(root, "computed-property").map((one) => one.declaredBy)).toEqual([
    "computed-property",
    "page-property",
    "module",
  ])
})

test("the types above are read level by level, and each type's own are taken in reverse", () => {
  const root = rootAt()
  propertied(root, "text-property", "definition", "definition")
  propertied(root, "text-property", "slug", "slug")
  propertied(root, "text-property", "code", "code")
  propertied(root, "text-property", "many", "many")
  propertied(root, "text-property", "formula", "formula")
  typed(root, "domain", null, [{ pagePropertySlug: "definition", required: true, many: false }])
  typed(root, "page", null, [{ pagePropertySlug: "slug", required: true, many: false }])
  typed(root, "module", ["domain"], [{ pagePropertySlug: "code", required: true, many: false }])
  typed(
    root,
    "page-property",
    ["page"],
    [{ pagePropertySlug: "many", required: true, many: false }]
  )
  typed(
    root,
    "computed-property",
    ["module", "page-property"],
    [{ pagePropertySlug: "formula", required: true, many: false }]
  )

  expect(declaredIn(root, "computed-property").map((one) => one.declaredBy)).toEqual([
    "computed-property",
    "page-property",
    "module",
    "page",
    "domain",
  ])
})

test("a declaration fixing a value carries it, and one saying nothing carries none", () => {
  const root = rootAt()
  propertied(root, "file-property", "code", "code")
  propertied(root, "text-property", "plural-slug", "plural-slug")
  typed(root, "page-type", null, [
    { pagePropertySlug: "code", required: true, many: false, fixed: "ts" },
    { pagePropertySlug: "plural-slug", required: true, many: false },
  ])

  expect(carriedBy(root, "page-type").map((one) => [one.key, one.fixed])).toEqual([
    ["code", "ts"],
    ["pluralSlug", undefined],
  ])
})

test("what a file property group declares is left to the pages carrying that group", () => {
  const root = rootAt()
  propertied(root, "text-property", "definition", "definition")
  propertied(root, "file-property", "code", "code")
  typed(root, "page-property", null, [
    { pagePropertySlug: "definition", required: true, many: false },
  ])
  typed(root, "file-property-group", ["page-property"], [])
  typed(
    root,
    "module-property-group",
    ["file-property-group"],
    [{ pagePropertySlug: "code", required: true, many: false }]
  )

  expect(carriedBy(root, "module-property-group").map((one) => one.key)).toEqual(["definition"])
  expect(carriedBy(root, "page-property").map((one) => one.key)).toEqual(["definition"])
})
