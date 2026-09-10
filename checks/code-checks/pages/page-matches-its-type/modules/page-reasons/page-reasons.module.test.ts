import { afterAll, expect, test } from "bun:test"
import { type Formatting, matchingIn } from "@akasha/pages/name-format/format-reaching"
import type { Carried } from "@akasha/pages/page-type-properties"
import type { Value } from "@akasha/pages/page-value"
import { shadowAt } from "@akasha/pages/shadow"
import { rootOf } from "../../../../../../commands/modules/rooting/rooting.module.code.ts"
import {
  besideCarried,
  FORMAT,
  scratch,
  seeded,
} from "../../page-matches-its-type.code-check.decision.test-fixtures.ts"
import { computedKey, reasonsIn } from "./page-reasons.module.code.ts"

afterAll(scratch.sweep)

const rooted = scratch.rootFor("akasha-page-reasons-")

const world = seeded(rooted)

const formatting = matchingIn(rooted, world.index)

function declaredIn(pageTypeSlug: string): readonly Carried[] {
  return world.index.propertiesOf(pageTypeSlug)
}

function slugsIn(declared: readonly Carried[]): readonly string[] {
  return declared.map((one) => one.pagePropertySlug)
}

function over(value: Value, pageTypeSlug: string): readonly string[] {
  return reasonsIn(
    value,
    declaredIn(pageTypeSlug),
    world,
    `page-type/${pageTypeSlug}`,
    formatting,
    new Set<string>()
  )
}

const ALLOWS: Formatting = () => (): boolean => true

const HERE = shadowAt(rootOf(import.meta.path))

const GROUP: Carried = {
  pagePropertySlug: "check",
  pageTypeSlug: "module-property-group",
  propertySlug: "check",
  key: "check",
  unique: null,
  declaredBy: "code-check",
  required: false,
  many: false,
  maxCount: null,
  maxLength: null,
  uncommitted: false,
  secret: false,
}

function grouped(held: Value): readonly string[] {
  return reasonsIn(held, [GROUP], HERE, "page-type/code-check", ALLOWS, new Set<string>())
}

test("a group a page states is judged against the members that group declares", () => {
  expect(grouped({ check: { maxCpuSeconds: 20 } })).toEqual([])
  expect(grouped({ check: { maxCpuSecons: 20 } })).toEqual([
    "states `check maxCpuSecons`, which `check` does not declare",
  ])
  expect(grouped({ check: { code: "ts" } })).toEqual([
    "states `check code`, which `check` does not declare",
  ])
})

test("the chain is walked and the nearest declaration binds", () => {
  const declared = declaredIn("check")
  expect([...slugsIn(declared)].sort()).toEqual(["aids", "id", "slug", "test"])
  expect(declared.find((one) => one.pagePropertySlug === "test")?.required).toBe(true)
  expect(declared.find((one) => one.pagePropertySlug === "id")?.required).toBe(true)
})

test("a property is keyed by what its own page states, not by the slug reaching it", () => {
  const declared = declaredIn("check")
  expect(declared.map((one) => one.key).sort()).toEqual(["aids", "id", "slug", "test"])
  expect(declared.find((one) => one.pagePropertySlug === "test")?.pageTypeSlug).toBe(
    "text-property"
  )
})

test("a cycle in the chain is walked once and does not hang", () => {
  expect(slugsIn(declaredIn("looping"))).toEqual(["id"])
})

test("a page carrying what its type declares raises nothing", () => {
  expect(over({ id: "a", slug: "one", test: "ts" }, "check")).toEqual([])
})

test("a required property the page does not state is refused", () => {
  expect(over({ id: "a", slug: "one" }, "check")).toEqual([
    "does not state `test`, which `page-type/check` requires",
  ])
})

test("a property the page type does not declare is refused", () => {
  expect(over({ id: "a", slug: "one", test: "ts", extra: 1 }, "check")).toEqual([
    "states `extra`, which `page-type/check` does not declare",
  ])
})

test("a value over its text length is refused", () => {
  expect(over({ id: "a", slug: "far-too-long", test: "ts" }, "check")).toEqual([
    "`slug` runs to 12 characters, over the length of 8",
  ])
})

test("a list over the count its declaration states is refused", () => {
  expect(over({ id: "a", slug: "one", test: "ts", aids: ["x", "y", "z"] }, "check")).toEqual([
    "holds 3 of `aids`, over the count of 2",
  ])
})

test("a list whose entry runs over the length its declaration states is refused", () => {
  expect(over({ id: "a", slug: "one", test: "ts", aids: ["hello", "world"] }, "check")).toEqual([
    "`aids` runs to 5 characters, over the length of 3",
    "`aids` runs to 5 characters, over the length of 3",
  ])
  expect(over({ id: "a", slug: "one", test: "ts", aids: ["ab", "cd"] }, "check")).toEqual([])
})

test("a declaration stating no length holds a list to its property's length", () => {
  expect(over({ id: "a", slug: "one", aids: ["hello", "world"] }, "told")).toEqual([])
})

test("a record field whose entry runs over the length its declaration states is refused", () => {
  const beyond = { id: "a", slug: "one", directives: [{ name: "go", aids: ["hello", "world"] }] }
  expect(over(beyond, "told")).toEqual([
    "`directives aids` runs to 5 characters, over the length of 4",
    "`directives aids` runs to 5 characters, over the length of 4",
  ])
  const under = { id: "a", slug: "one", directives: [{ name: "go", aids: ["ab", "cd"] }] }
  expect(over(under, "told")).toEqual([])
})

test("a record field's entries and its characters are counted apart", () => {
  const value = {
    id: "a",
    slug: "one",
    directives: [{ name: "go", aids: ["abcde", "cd", "ef", "g"] }],
  }
  expect(over(value, "told")).toEqual([
    "holds 4 of `directives aids`, over the count of 3",
    "`directives aids` runs to 5 characters, over the length of 4",
  ])
})

test("a record field naming its page type is read under the key its own property states", () => {
  const held = { id: "a", slug: "one", directives: [{ name: "go", tag: "hi" }] }
  expect(over(held, "told")).toEqual([])
})

test("a record field's property page is reached by the page type its declaration names", () => {
  const held = { id: "a", slug: "one", directives: [{ name: "go", tag: "hello" }] }
  expect(over(held, "told")).toEqual([
    "`directives tag` runs to 5 characters, over the length of 4",
  ])
})

test("a property stating a length is judged whatever page type that property is", () => {
  expect(over({ id: "a", slug: "one", tally: "toolong" }, "told")).toEqual([
    "`tally` runs to 7 characters, over the length of 4",
  ])
})

test("a single value declared many is refused, and a list declared single is refused", () => {
  expect(over({ id: "a", slug: "one", test: "ts", aids: "x" }, "check")).toEqual([
    "states `aids` singly, and `page-type/check` declares it many",
  ])
  expect(over({ id: "a", slug: "one", test: ["ts"] }, "check")).toEqual([
    "states `test` as a list, and `page-type/check` declares it single",
  ])
})

test("a page type the index does not name is refused, and the check's own reading passes over", () => {
  expect(() => declaredIn("no-such-type")).toThrow("`no-such-type` names no page type here")
  expect(world.index.propertiesIfNamed("no-such-type")).toBe(null)
})

test("a list repeating a value is refused, and one carrying each once is not", () => {
  expect(over({ id: "a", slug: "one", test: "ts", aids: ["x", "x"] }, "check")).toEqual([
    `repeats "x" in \`aids\`, and a list carries each value once`,
  ])
  expect(over({ id: "a", slug: "one", test: "ts", aids: ["x", "y"] }, "check")).toEqual([])
})

test("a value the format its property states refuses is refused here", () => {
  expect(over({ id: "a", slug: "One", test: "ts" }, "check")).toEqual([
    '`slug` is "One", which is not written in `all-lower`',
  ])
})

test("a value the format its property states admits raises nothing", () => {
  expect(over({ id: "a", slug: "one-two", test: "ts" }, "check")).toEqual([])
})

test("a text property stating no format has its values passed over", () => {
  expect(over({ id: "a", slug: "one", test: "TS" }, "check")).toEqual([])
})

test("a record field is judged by the format its own property states", () => {
  expect(over({ id: "a", slug: "one", directives: [{ name: "Go" }] }, "told")).toEqual([
    '`directives name` is "Go", which is not written in `all-lower`',
  ])
})

test("a value both over its max and off its format is refused for each", () => {
  expect(over({ id: "a", slug: "Far-Too-Long", test: "ts" }, "check")).toEqual([
    "`slug` runs to 12 characters, over the length of 8",
    '`slug` is "Far-Too-Long", which is not written in `all-lower`',
  ])
})

test("a format is asked for only where a property states one", () => {
  const asked: string[] = []
  const watching: Formatting = (nameFormatSlug) => {
    asked.push(nameFormatSlug)
    return formatting(nameFormatSlug)
  }
  reasonsIn(
    { id: "a", slug: "one", test: "ts" },
    declaredIn("check"),
    world,
    "page-type/check",
    watching,
    new Set<string>()
  )
  expect(asked).toEqual([FORMAT])
})

test("a required property named as excused is not asked for, and the rest of them still are", () => {
  const declared = declaredIn("check")
  const held = { id: "a", slug: "one" }
  const excusing = (slug: string): readonly string[] =>
    reasonsIn(held, declared, world, "page-type/check", formatting, new Set([slug]))
  expect(excusing("test")).toEqual([])
  expect(excusing("id")).toEqual(["does not state `test`, which `page-type/check` requires"])
})

function beside(value: Value, uncommitted: boolean, secret = false): readonly string[] {
  return reasonsIn(
    value,
    besideCarried(uncommitted, secret),
    world,
    "page-type/beside",
    formatting,
    new Set<string>()
  )
}

test("a required property its type declares uncommitted is not demanded, and a committed one is", () => {
  expect(beside({}, true)).toEqual([])
  expect(beside({}, false)).toEqual(["does not state `test`, which `page-type/beside` requires"])
})

test("a page stating a property its type declares uncommitted is refused, and a committed one is not", () => {
  expect(beside({ test: "ts" }, true)).toEqual([
    "states `test`, which `page-type/beside` declares uncommitted, and such a value stands beside the page rather than in it",
  ])
  expect(beside({ test: "ts" }, false)).toEqual([])
})

test("a required property its type declares secret is not demanded, and an open one is", () => {
  expect(beside({}, false, true)).toEqual([])
  expect(beside({}, false, false)).toEqual([
    "does not state `test`, which `page-type/beside` requires",
  ])
})

test("a page stating a property its type declares secret is refused, and an open one is not", () => {
  expect(beside({ test: "ts" }, false, true)).toEqual([
    "states `test`, which `page-type/beside` declares secret, and such a value stands in the page's sops file rather than in it",
  ])
  expect(beside({ test: "ts" }, false, false)).toEqual([])
})

const WORKED: readonly Carried[] = besideCarried(false).map((one) => ({
  ...one,
  pageTypeSlug: "computed-property",
}))

function worked(value: Value): readonly string[] {
  return reasonsIn(value, WORKED, world, "page-type/beside", formatting, new Set<string>())
}

test("a property its type works out is not demanded, and stating one is refused", () => {
  expect(worked({})).toEqual([])
  expect(worked({ test: 1 })).toEqual([
    "states `test`, which `page-type/beside` works out, and such a value is worked out as the page is read rather than kept in it",
  ])
  expect(worked({ test: 1 })).toEqual([computedKey("test", "page-type/beside")])
})
