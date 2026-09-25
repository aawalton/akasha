import { afterAll, expect, test } from "bun:test"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import {
  editedIn,
  keptOrderIn,
  stepsFor,
} from "akasha/page/modules/body-editing/page-body-editing.module.code.ts"
import {
  A_HELD_NOTED,
  bodyIn,
  composing,
  HELD_NOTED_BODY,
} from "akasha/page/service/modules/page-composing/page-composing.module.test-fixtures.ts"

afterAll(scratch.sweep)

const AT = "held/one.thing.ts"

const BODY = `import type { Thing } from "akasha/thing.page-type.types.ts"

export const one = {
  id: "an-id",
  slug: "one",

  // the parts, in the order they were laid out
  parts: [
    "a",

    "b",
  ],
  remark: "noted", // kept as written
} as const satisfies Thing
`

const WAS = { id: "an-id", slug: "one", parts: ["a", "b"], remark: "noted" }

const KEYS = ["id", "slug", "title", "parts", "remark"]

function edited(keys: readonly string[], values: Record<string, unknown>): string | null {
  return editedIn({
    path: AT,
    text: BODY,
    was: WAS,
    rendering: { pageTypeSlug: "thing", slug: "one", importFrom: "", keys, values },
  })
}

test("a page read and written back unchanged is the same file byte for byte", () => {
  expect(bodyIn(composing({ ...A_HELD_NOTED, values: {} }))).toBe(HELD_NOTED_BODY)
  const same = { title: "the name it already has", remark: "what was already noted" }
  expect(bodyIn(composing({ ...A_HELD_NOTED, values: same }))).toBe(HELD_NOTED_BODY)
})

test("a page with one key changed is the same file byte for byte apart from that key", () => {
  const said = composing({ ...A_HELD_NOTED, values: { remark: "noted again" } })
  expect(bodyIn(said)).toBe(
    HELD_NOTED_BODY.replace('remark: "what was already noted"', 'remark: "noted again"')
  )
})

test("a key a written page drops goes and every other byte stays", () => {
  const said = composing({ ...A_HELD_NOTED, values: {}, clears: ["caption"] })
  expect(bodyIn(said)).toBe(HELD_NOTED_BODY.replace('  caption: "what it is shown as",\n', ""))
})

test("a body whose values are all unchanged is answered as the same text", () => {
  expect(edited(KEYS, WAS)).toBe(BODY)
})

test("a key whose value changed has that value replaced and keeps its own text", () => {
  expect(edited(KEYS, { ...WAS, remark: "again" })).toBe(
    BODY.replace('remark: "noted"', 'remark: "again"')
  )
})

test("a list changed is written as JSON, and the lines around it stay", () => {
  const said = edited(KEYS, { ...WAS, parts: ["a"] })
  expect(said).toContain('  // the parts, in the order they were laid out\n  parts: ["a"],\n')
  expect(said).toContain('remark: "noted", // kept as written')
})

test("a key the values no longer carry goes with the line that key sits on", () => {
  const kept = { id: WAS.id, slug: WAS.slug, parts: WAS.parts }
  expect(edited(KEYS, kept)).toBe(BODY.replace('  remark: "noted", // kept as written\n', ""))
})

test("a key the page lacked is put on a line of its own after the key before it", () => {
  expect(edited(KEYS, { ...WAS, title: "One" })).toBe(
    BODY.replace('  slug: "one",\n', '  slug: "one",\n  title: "One",\n')
  )
})

test("a key after a key carrying a comment lands below that comment's line", () => {
  expect(edited([...KEYS, "caption"], { ...WAS, caption: "c" })).toBe(
    BODY.replace("// kept as written\n", '// kept as written\n  caption: "c",\n')
  )
})

test("a key first in the order lands above every key the page states", () => {
  expect(edited(["first", ...KEYS], { first: 1, ...WAS })).toBe(
    BODY.replace('  id: "an-id",\n', '  first: 1,\n  id: "an-id",\n')
  )
})

test("a body exporting no object is answered as none", () => {
  const said = editedIn({
    path: AT,
    text: "const one = 1\n",
    was: WAS,
    rendering: { pageTypeSlug: "thing", slug: "one", importFrom: "", keys: KEYS, values: {} },
  })
  expect(said).toBeNull()
})

test("a value equal to the value the page holds is no step", () => {
  const rendering = {
    pageTypeSlug: "t",
    slug: "s",
    importFrom: "",
    keys: ["a"],
    values: { a: [1] },
  }
  expect(stepsFor({ a: [1] }, rendering)).toEqual([])
})

test("a page keeps its key order, and a key it lacked is placed as declared", () => {
  expect(keptOrderIn(["a", "b", "c"], ["c", "a"])).toEqual(["c", "a", "b"])
})
