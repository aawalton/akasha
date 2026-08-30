import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import type { Change } from "../../../pages-system/change/change.module.code.ts"
import type { Value } from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import { indexIn } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import type { Formatting } from "../../../pages-system/name-format/format-reaching/format-reaching.module.code.ts"
import { shadowFor } from "../../../pages-system/shadow/shadow.module.code.ts"
import { put } from "../../../testing-system/putting/putting.module.code.ts"
import type { Judged } from "../../judging/judging.module.code.ts"
import {
  DECLARES_NO_PAGE,
  declaredFor,
  pageMatchesItsType,
  reasonsIn,
  STATES_NO_PAGE_TYPE,
} from "./page-matches-its-type.check.code.ts"
import {
  allLower,
  FORMAT,
  formatting,
  GENERATED_ID,
  KIND_AT,
  property,
  read,
  THING_AT,
  THING_BODY,
  THING_ID,
  UNIQUE_SLUG,
} from "./page-matches-its-type.check.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const HELD_AT = "akasha/held.page-type.ts"

function changing(root: string, bodies: Readonly<Record<string, string>>): Change {
  const at = (path: string): Uint8Array | null => {
    const said = bodies[path]
    return said === undefined ? null : new TextEncoder().encode(said)
  }
  return { root, changed: Object.keys(bodies).sort(), after: at, before: at }
}

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return pageMatchesItsType(change, cast.shadow)
}

function judgedOver(bodies: Readonly<Record<string, string>>): readonly Judged[] {
  return judged(changing(scratch.rootFor("akasha-matches-"), bodies))
}

function over(value: Value, pageTypeSlug: string): readonly string[] {
  return reasonsIn(
    value,
    declaredFor(pageTypeSlug, read),
    property,
    `page-type/${pageTypeSlug}`,
    formatting,
    new Set<string>()
  )
}

test("the chain is walked and the nearest declaration binds", () => {
  const declared = declaredFor("check", read)
  expect([...declared.keys()].sort()).toEqual(["aids", "id", "slug", "test"])
  expect(declared.get("test")?.required).toBe(true)
  expect(declared.get("id")?.required).toBe(true)
})

test("a cycle in the chain is walked once and does not hang", () => {
  expect([...declaredFor("looping", read).keys()]).toEqual(["id"])
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

test("a value over its text max is refused", () => {
  expect(over({ id: "a", slug: "far-too-long", test: "ts" }, "check")).toEqual([
    "`slug` runs to 12 characters, over the max of 8",
  ])
})

test("a list over the max its declaration states is refused", () => {
  expect(over({ id: "a", slug: "one", test: "ts", aids: ["x", "y", "z"] }, "check")).toEqual([
    "holds 3 of `aids`, over the max of 2",
  ])
})

test("a list over the total its declaration states is refused", () => {
  expect(over({ id: "a", slug: "one", test: "ts", aids: ["hello", "world"] }, "check")).toEqual([
    "holds 10 characters of `aids`, over the total of 6",
  ])
  expect(over({ id: "a", slug: "one", test: "ts", aids: ["ab", "cd"] }, "check")).toEqual([])
})

test("a declaration stating no total lets a list run to any length", () => {
  expect(over({ id: "a", slug: "one", aids: ["hello", "world"] }, "told")).toEqual([])
})

test("a record field over the total its declaration states is refused", () => {
  const over_ = { id: "a", slug: "one", directives: [{ name: "go", aids: ["hello", "world"] }] }
  expect(over(over_, "told")).toEqual([
    "holds 10 characters of `directives aids`, over the total of 6",
  ])
  const under = { id: "a", slug: "one", directives: [{ name: "go", aids: ["ab", "cd"] }] }
  expect(over(under, "told")).toEqual([])
})

test("a record field's entries and its characters are counted apart", () => {
  const value = {
    id: "a",
    slug: "one",
    directives: [{ name: "go", aids: ["ab", "cd", "ef", "g"] }],
  }
  expect(over(value, "told")).toEqual([
    "holds 4 of `directives aids`, over the max of 3",
    "holds 7 characters of `directives aids`, over the total of 6",
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

test("a page type that declares nothing anywhere leaves an empty map", () => {
  expect(declaredFor("no-such-type", read).size).toBe(0)
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
    "`slug` runs to 12 characters, over the max of 8",
    '`slug` is "Far-Too-Long", which is not written in `all-lower`',
  ])
})

test("a format is asked for only where a property states one", () => {
  const asked: string[] = []
  const watching: Formatting = (nameFormatSlug) => {
    asked.push(nameFormatSlug)
    return allLower
  }
  reasonsIn(
    { id: "a", slug: "one", test: "ts" },
    declaredFor("check", read),
    property,
    "page-type/check",
    watching,
    new Set<string>()
  )
  expect(asked).toEqual([FORMAT])
})

test("a page stating no page type is refused, and is not passed over", () => {
  const body = 'export const held = { id: "a", slug: "held" }\n'
  expect(judgedOver({ [HELD_AT]: body })).toEqual([{ path: HELD_AT, reason: STATES_NO_PAGE_TYPE }])
})

test("a page whose body declares no page is refused, and is not passed over", () => {
  expect(judgedOver({ [HELD_AT]: "export const held = 1\n" })).toEqual([
    { path: HELD_AT, reason: DECLARES_NO_PAGE },
  ])
})

test("a page whose body will not load is refused, and the refusal carries why it would not", () => {
  const said = judgedOver({ [HELD_AT]: "export const held = (\n" })
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(HELD_AT)
  expect(said[0]?.reason).toContain("would not load")
  expect(said[0]?.reason).toContain("Unexpected end of file")
})

test("a page whose page type declares nothing is passed over, as it was before", () => {
  const body = 'export const held = { id: "a", slug: "held", pageTypeSlug: "page-type" }\n'
  expect(judgedOver({ [HELD_AT]: body })).toEqual([])
})

test("a file the corpus does not name as a page is passed over, whatever its body says", () => {
  expect(judgedOver({ "akasha/held.ts": "export const held = (\n" })).toEqual([])
})

test("a path outside the akasha folder is passed over, however it is named", () => {
  expect(judgedOver({ "shared/held.page-type.ts": "export const held = (\n" })).toEqual([])
})

test("a required property named as excused is not asked for, and the rest of them still are", () => {
  const declared = declaredFor("check", read)
  const held = { id: "a", slug: "one" }
  const excusing = (slug: string): readonly string[] =>
    reasonsIn(held, declared, property, "page-type/check", formatting, new Set([slug]))
  expect(excusing("test")).toEqual([])
  expect(excusing("id")).toEqual(["does not state `test`, which `page-type/check` requires"])
})

function generating(generator = "waiting"): string {
  const root = scratch.rootFor("akasha-generating-")
  put(
    root,
    "akasha/held.text-property.ts",
    `export const held = { id: "${GENERATED_ID}", pageTypeSlug: "text-property",` +
      ` slug: "held", generator: "${generator}" }\n`
  )
  put(
    root,
    KIND_AT,
    `export const kind = { id: "${GENERATED_ID}", pageTypeSlug: "generator-kind",` +
      ' slug: "waiting", afterChecks: true }\n'
  )
  put(
    root,
    "akasha/uuid-v7.generator-kind.ts",
    `export const kind = { id: "${GENERATED_ID}", pageTypeSlug: "generator-kind",` +
      ' slug: "uuid-v7", afterChecks: false }\n'
  )
  put(
    root,
    "akasha/thing.page-type.ts",
    `export const thing = { id: "${THING_ID}", pageTypeSlug: "page-type", slug: "thing",` +
      ' extendsSlug: null, properties: [{ pagePropertySlug: "held", required: true, many: false },' +
      ' { pagePropertySlug: "page-type-slug", required: true, many: false },' +
      ' { pagePropertySlug: "slug", required: true, many: false }] }\n'
  )
  const index = indexIn(root)
  put(index, "schema/page-property/text-property/slug/slug.jsonl", UNIQUE_SLUG)
  put(
    index,
    "schema/page-property/text-property/slug/held.jsonl",
    '{"pageTypeSlug":"text-property","targetPageTypeSlug":null,"unique":null,' +
      '"slug":"held","propertySlug":"held"}\n'
  )
  put(
    index,
    "identity/text-property/slug/held.jsonl",
    `{"path":"akasha/held.text-property.ts","id":"${GENERATED_ID}"}\n`
  )
  put(
    index,
    "identity/page-type/slug/thing.jsonl",
    `{"path":"akasha/thing.page-type.ts","id":"${THING_ID}"}\n`
  )
  put(
    index,
    "identity/generator-kind/slug/waiting.jsonl",
    `{"path":"${KIND_AT}","id":"${GENERATED_ID}"}\n`
  )
  put(
    index,
    "identity/generator-kind/slug/uuid-v7.jsonl",
    `{"path":"akasha/uuid-v7.generator-kind.ts","id":"${GENERATED_ID}"}\n`
  )
  return root
}

function overThing(standing: boolean, generator = "waiting"): readonly Judged[] {
  const bytes = new TextEncoder().encode(THING_BODY)
  return judged({
    root: generating(generator),
    changed: [THING_AT],
    after: (path) => (path === THING_AT ? bytes : null),
    before: (path) => (standing && path === THING_AT ? bytes : null),
  })
}

const DEMANDED = {
  path: THING_AT,
  reason: "does not state `held`, which `page-type/thing` requires",
}

test("a page being created is not refused for a property a generator fills after the checks", () => {
  expect(overThing(false)).toEqual([])
})

test("a page being created is refused for a property a generator fills before the checks", () => {
  expect(overThing(false, "uuid-v7")).toEqual([DEMANDED])
})

test("a page already standing is refused for dropping a property a generator fills", () => {
  expect(overThing(true)).toEqual([DEMANDED])
})

const ALPHA_AT = "akasha/alpha.page-type.ts"

const BOTH = '{ pagePropertySlug: "page-type-slug" }'

function typing(id: string, slug: string, above: string, declares: string): string {
  return (
    `export const held = { id: "${id}", pageTypeSlug: "page-type", slug: "${slug}",` +
    ` extendsSlug: ${above}, properties: [${declares}] }\n`
  )
}

const WAS_ALPHA = typing(THING_ID, "alpha", "null", BOTH)

function bytesFor(bodies: Readonly<Record<string, string>>): (path: string) => Uint8Array | null {
  return (path) => {
    const said = bodies[path]
    return said === undefined ? null : new TextEncoder().encode(said)
  }
}

test("a page stating what a page type the change puts above its own declares is let through", () => {
  const root = scratch.rootFor("akasha-extending-")
  put(root, ALPHA_AT, WAS_ALPHA)
  put(indexIn(root), "schema/page-property/text-property/slug/slug.jsonl", UNIQUE_SLUG)
  put(
    indexIn(root),
    "identity/page-type/slug/alpha.jsonl",
    `{"path":"${ALPHA_AT}","id":"${THING_ID}"}\n`
  )
  const now = {
    [ALPHA_AT]: typing(THING_ID, "alpha", '"page-type/beta"', BOTH),
    "akasha/beta.page-type.ts": typing(
      GENERATED_ID,
      "beta",
      "null",
      `${BOTH}, { pagePropertySlug: "note" }`
    ),
    "akasha/one.alpha.ts": 'export const one = { pageTypeSlug: "alpha", note: "hi" }\n',
  }
  expect(
    judged({
      root,
      changed: Object.keys(now).sort(),
      after: bytesFor(now),
      before: bytesFor({ [ALPHA_AT]: WAS_ALPHA }),
    })
  ).toEqual([])
})

const besideRead =
  (uncommitted: boolean) =>
  (pageTypeSlug: string, slug: string): Value | null =>
    slug === "beside"
      ? {
          pageTypeSlug: "page-type",
          slug: "beside",
          extendsSlug: null,
          properties: [{ pagePropertySlug: "test", required: true, many: false, uncommitted }],
        }
      : read(pageTypeSlug, slug)

function beside(value: Value, uncommitted: boolean): readonly string[] {
  return reasonsIn(
    value,
    declaredFor("beside", besideRead(uncommitted)),
    property,
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
