import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import { nothingFiled } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages-system/change"
import { type Formatting, matchingIn } from "@akasha/pages-system/name-format/format-reaching"
import type { Carried } from "@akasha/pages-system/page-type-properties"
import type { Value } from "@akasha/pages-system/page-value"
import { shadowFor } from "@akasha/pages-system/shadow"
import { onDisk } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  DECLARES_NO_PAGE,
  fieldsOf,
  pageMatchesItsType,
  reasonsIn,
  STATES_NO_PAGE_TYPE,
} from "./page-matches-its-type.code-check.code.ts"
import {
  ALPHA_AT,
  BETA_AT,
  besideCarried,
  entriesJudged,
  extending,
  FORMAT,
  generating,
  HELD_ID,
  ID_LESS,
  NARROWED,
  NO_ID,
  NOW_ALPHA,
  NOW_BETA,
  ONE_HELD,
  ONE_HELD_AT,
  partsJudged,
  seeded,
  shapingFor,
  THING_AT,
  THING_BODY,
  typing,
  WAS_ALPHA,
} from "./page-matches-its-type.code-check.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const HELD_AT = "akasha/held.page-type.ts"

const rooted = scratch.rootFor("akasha-matches-")

const world = seeded(rooted)

const formatting = matchingIn(rooted, world.index)

function declaredIn(pageTypeSlug: string): readonly Carried[] {
  return world.index.propertiesOf(pageTypeSlug)
}

function slugsIn(declared: readonly Carried[]): readonly string[] {
  return declared.map((one) => one.pagePropertySlug)
}

function bytesFor(bodies: Readonly<Record<string, string>>, root?: string) {
  const disk = root === undefined ? (): null => null : onDisk(root)
  return (path: string): Uint8Array | null => {
    const said = bodies[path]
    return said === undefined ? disk(path) : new TextEncoder().encode(said)
  }
}

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return pageMatchesItsType(change, cast.shadow)
}

function judgedOver(bodies: Readonly<Record<string, string>>): readonly Judged[] {
  const root = scratch.rootFor("akasha-matches-")
  nothingFiled(root)
  const at = bytesFor(bodies)
  return judged({ root, changed: Object.keys(bodies).sort(), after: at, before: at })
}

function landing(
  root: string,
  now: Readonly<Record<string, string>>,
  was: Readonly<Record<string, string>>
): readonly Judged[] {
  return judged({
    root,
    changed: Object.keys(now).sort(),
    after: bytesFor(now, root),
    before: bytesFor(was),
  })
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
  const beyond = { id: "a", slug: "one", directives: [{ name: "go", aids: ["hello", "world"] }] }
  expect(over(beyond, "told")).toEqual([
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

test("a record field naming its page type is read under the key its own property states", () => {
  const held = { id: "a", slug: "one", directives: [{ name: "go", tag: "hi" }] }
  expect(over(held, "told")).toEqual([])
})

test("a record field's property page is reached by the page type its declaration names", () => {
  const held = { id: "a", slug: "one", directives: [{ name: "go", tag: "hello" }] }
  expect(over(held, "told")).toEqual(["`directives tag` runs to 5 characters, over the max of 4"])
})

test("a property stating a max is judged whatever page type that property is", () => {
  expect(over({ id: "a", slug: "one", tally: "toolong" }, "told")).toEqual([
    "`tally` runs to 7 characters, over the max of 4",
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
  // This asked the strict reading for `no-such-type` and expected `[]`, which conflated a page
  // type that is not there with one that carries nothing. Seven page types really were absent from
  // the identity index while their files sat on disk, and every one read as declaring nothing.
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
    "`slug` runs to 12 characters, over the max of 8",
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

test("a file the index does not name as a page is passed over, whatever its body says", () => {
  expect(judgedOver({ "akasha/held.ts": "export const held = (\n" })).toEqual([])
})

test("a path outside the akasha folder is passed over, however it is named", () => {
  expect(judgedOver({ "shared/held.page-type.ts": "export const held = (\n" })).toEqual([])
})

test("a required property named as excused is not asked for, and the rest of them still are", () => {
  const declared = declaredIn("check")
  const held = { id: "a", slug: "one" }
  const excusing = (slug: string): readonly string[] =>
    reasonsIn(held, declared, world, "page-type/check", formatting, new Set([slug]))
  expect(excusing("test")).toEqual([])
  expect(excusing("id")).toEqual(["does not state `test`, which `page-type/check` requires"])
})

function overThing(already: boolean, generator = "waiting"): readonly Judged[] {
  const held = { [THING_AT]: THING_BODY }
  const root = generating(scratch.rootFor("akasha-generating-"), generator)
  return judged({
    root,
    changed: [THING_AT],
    after: bytesFor(held, root),
    before: bytesFor(already ? held : {}),
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

test("a page stating what a page type the change puts above its own declares is let through", () => {
  const root = extending(scratch.rootFor("akasha-extending-"))
  const now = {
    [ALPHA_AT]: NOW_ALPHA,
    [BETA_AT]: NOW_BETA,
    "akasha/one.alpha.ts": 'export const one = { pageTypeSlug: "alpha", note: "hi" }\n',
  }
  expect(landing(root, now, { [ALPHA_AT]: WAS_ALPHA })).toEqual([])
})

test("a page type the change carries is read as the change leaves it", () => {
  const root = scratch.rootFor("akasha-carried-")
  seeded(root)
  const narrowing = { [HELD_AT]: typing(HELD_ID, "held", '["page-type/page"]', NARROWED) }
  expect(landing(root, { ...narrowing, [ONE_HELD_AT]: ONE_HELD }, {})).toEqual([
    { path: ONE_HELD_AT, reason: "does not state `name`, which `page-type/held` requires" },
  ])
  expect(landing(root, { [ONE_HELD_AT]: ONE_HELD }, {})).toEqual([])
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

const OWN = new Set(["id"])

test("an entry beside the page is judged against the fields its shape declares", () => {
  expect(fieldsOf({ id: "one", answer: "YES" }, shapingFor(formatting), OWN)).toEqual([])
  expect(fieldsOf({ id: "one", nope: 1 }, shapingFor(formatting), OWN)).toEqual([
    "states `cases nope`, which `cases` does not declare",
  ])
})

test("the cases beside the restatement test are read and judged", () => {
  expect(entriesJudged(formatting, null)).toEqual([])
  expect(entriesJudged(formatting, "no json here\n")[0]).toContain("unknown rather than nothing")
  expect(entriesJudged(formatting, ID_LESS)).toEqual([NO_ID])
  expect(partsJudged(formatting, "", ID_LESS)).toEqual([NO_ID])
})
