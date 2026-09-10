import { expect, test } from "bun:test"
import type { Key } from "./worked-typing.module.code.ts"
import { bodyFor, storedAtOf, textIn, workedAtOf } from "./worked-typing.module.code.ts"

const AT = "collections/collection.page-type.ts"

function computed(key: string, typeName: string, slug: string): Key {
  return {
    key,
    typeName,
    at: `collections/properties/${slug}.computed-property.ts`,
    overrides: false,
  }
}

test("the file sits beside the page type as its `worked` section", () => {
  expect(workedAtOf(AT)).toBe("collections/collection.page-type.worked.ts")
})

test("a page type whose properties are all calculations extends its stored type", () => {
  const body = bodyFor(AT, AT, "collection", [
    computed("totalLength", "TotalLength", "total-length"),
    computed("completion", "CollectionCompletion", "collection-completion"),
  ])
  expect(body).toBe(
    `import type { Collection } from "./collection.page-type.ts"
import type { CollectionCompletion } from "./properties/collection-completion.computed-property.ts"
import type { TotalLength } from "./properties/total-length.computed-property.ts"

export type WorkedCollection = Collection & {
  totalLength?: TotalLength
  completion?: CollectionCompletion
}
`
  )
})

test("a key comes out in the order the page type declares its properties", () => {
  const body = bodyFor(AT, AT, "collection", [
    computed("zed", "Zed", "zed"),
    computed("alpha", "Alpha", "alpha"),
  ])
  expect(body.indexOf("zed?: Zed")).toBeLessThan(body.indexOf("alpha?: Alpha"))
})

test("the imports are sorted by specifier however the keys are ordered", () => {
  const body = bodyFor(AT, AT, "collection", [
    computed("zed", "Zed", "zed"),
    computed("alpha", "Alpha", "alpha"),
  ])
  expect(body.indexOf("alpha.computed-property.ts")).toBeLessThan(
    body.indexOf("zed.computed-property.ts")
  )
})

test("a stored property declaring a worked form is omitted from the type it extends", () => {
  const day = "alan/track/daily/days/day.page-type.ts"
  const body = bodyFor(day, day, "day", [
    {
      key: "sessions",
      typeName: "WorkedSessions",
      at: "alan/track/daily/days/properties/sessions.page-property-entry.ts",
      overrides: true,
    },
  ])
  expect(body).toContain(`export type WorkedDay = Omit<Day, "sessions"> & {`)
  expect(body).toContain("  sessions?: WorkedSessions")
})

test("two stored properties declaring a worked form are both omitted", () => {
  const body = bodyFor(AT, AT, "collection", [
    { key: "one", typeName: "WorkedOne", at: "collections/properties/one.x.ts", overrides: true },
    { key: "two", typeName: "WorkedTwo", at: "collections/properties/two.x.ts", overrides: true },
  ])
  expect(body).toContain(`Omit<Collection, "one" | "two">`)
})

test("a page type stating a types file has its stored type named from that file", () => {
  const types = "collections/collection.page-type.types.ts"
  expect(storedAtOf(AT, { types: "ts" })).toBe(types)
  expect(storedAtOf(AT, {})).toBe(AT)
  const body = bodyFor(AT, types, "collection", [
    computed("totalLength", "TotalLength", "total-length"),
  ])
  expect(body).toContain(`import type { Collection } from "./collection.page-type.types.ts"`)
})

test("a body is read through the change at the path the shadow says holds that body", () => {
  const read = textIn(
    {
      root: "/root",
      changed: [],
      before: () => null,
      after: (at) => (at === "came-from.ts" ? new TextEncoder().encode("BODY") : null),
    },
    (path) => (path === "held.ts" ? "came-from.ts" : null)
  )
  expect(read("held.ts")).toBe("BODY")
  expect(read("anew.ts")).toBeNull()
})
