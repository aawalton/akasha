import { expect, test } from "bun:test"
import { type FileChange, stating } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { literalIn } from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import {
  editsFor,
  editsOver,
  placeOf,
  splicesIn,
  type Written,
} from "akasha/change/modules/page-property-splicing/page-property-splicing.module.code.ts"
import { bodiesIn } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { worldOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"

const ONE_AT = "thrumming/moots/one.moot-call.ts"

const TWO_AT = "thrumming/moots/two.moot-call.ts"

function mootAt(slug: string): string {
  return `export const ${slug} = {
  slug: "${slug}",
  heldBy: "aine",
  weight: 1,
} as const satisfies MootCall
`
}

const BODIES = { [ONE_AT]: mootAt("one"), [TWO_AT]: mootAt("two") }

const DAWN = `"dawn"`

function bodyOf(edits: readonly FileChange[]): string {
  const world = worldOf(BODIES)
  return bodiesIn(stating(edits), world.base).get(ONE_AT) ?? ""
}

function madeOf(written: readonly Written[]): readonly FileChange[] | string {
  return editsFor(worldOf(BODIES), { path: ONE_AT, written })
}

function bodyFor(written: readonly Written[]): string {
  const made = madeOf(written)
  return typeof made === "string" ? made : bodyOf(made)
}

test("a key put in lands after the key named", () => {
  const body = bodyFor([{ written: "put", key: "sungAt", value: DAWN, after: "slug" }])

  expect(body).toContain(`slug: "one",\n  sungAt: "dawn",\n  heldBy: "aine",`)
})

test("a key put in with no key named lands last", () => {
  const body = bodyFor([{ written: "put", key: "sungAt", value: DAWN }])

  expect(body).toContain(`weight: 1,\n  sungAt: "dawn",`)
})

test("a key put in the place of another takes that other key's whole property", () => {
  const body = bodyFor([{ written: "put", key: "sungAt", value: DAWN, insteadOf: "heldBy" }])

  expect(body).toContain(`slug: "one",\n  sungAt: "dawn",\n  weight: 1,`)
  expect(body).not.toContain("heldBy")
})

test("a key put in the place of a key the page states nowhere is refused", () => {
  const made = madeOf([{ written: "put", key: "sungAt", value: DAWN, insteadOf: "mooted" }])

  expect(made).toContain("`mooted` is stated nowhere")
  expect(made).toContain(ONE_AT)
})

test("a key the page states already is refused rather than stated twice", () => {
  const made = madeOf([{ written: "put", key: "heldBy", value: `"alan"` }])

  expect(made).toContain("is a restatement")
  expect(made).toContain(ONE_AT)
})

test("a key the page states nowhere is dropped by nothing rather than refused", () => {
  expect(madeOf([{ written: "dropped", key: "mooted" }])).toEqual([])
})

test("a key the page states is dropped with the value that key holds", () => {
  const body = bodyFor([{ written: "dropped", key: "heldBy" }])

  expect(body).toContain(`slug: "one",\n  weight: 1,`)
  expect(body).not.toContain("aine")
})

test("edits touching one passage of a page come out as one edit over that passage", () => {
  const made = madeOf([
    { written: "put", key: "sungAt", value: DAWN, insteadOf: "heldBy" },
    { written: "dropped", key: "weight" },
  ])

  expect(made).toHaveLength(1)
  expect(typeof made === "string" ? made : bodyOf(made)).toContain(
    `slug: "one",\n  sungAt: "dawn",\n}`
  )
})

test("a page exporting no object is refused by its path", () => {
  const made = editsFor(worldOf({ [ONE_AT]: "const one = 1\n" }), {
    path: ONE_AT,
    written: [{ written: "dropped", key: "heldBy" }],
  })

  expect(made).toBe(`\`${ONE_AT}\` exports no object`)
})

test("a path the world holds no body at is refused by that path", () => {
  expect(editsFor(worldOf({}), { path: ONE_AT, written: [] })).toBe(
    `\`${ONE_AT}\` could not be read`
  )
})

test("one page refused refuses the whole run, and the refusal names that page", () => {
  const made = editsOver(worldOf({ ...BODIES, [TWO_AT]: "const two = 1\n" }), [
    { path: ONE_AT, written: [{ written: "dropped", key: "heldBy" }] },
    { path: TWO_AT, written: [{ written: "dropped", key: "heldBy" }] },
  ])

  expect(made).toBe(`\`${TWO_AT}\` exports no object`)
})

test("every page handed in is answered in the one run", () => {
  const made = editsOver(worldOf(BODIES), [
    { path: ONE_AT, written: [{ written: "dropped", key: "heldBy" }] },
    { path: TWO_AT, written: [{ written: "dropped", key: "heldBy" }] },
  ])

  expect(made).toHaveLength(2)
})

test("a key is found where the page it sits on states that key", () => {
  const owner = literalIn(parsedAs(ONE_AT, mootAt("one")))
  if (owner === null) throw new Error("the fixture exports an object")

  expect(placeOf(owner, "heldBy")).toBe(1)
  expect(placeOf(owner, "mooted")).toBe(-1)
})

test("one splice comes out for each key written", () => {
  const text = mootAt("one")
  const source = parsedAs(ONE_AT, text)
  const owner = literalIn(source)
  if (owner === null) throw new Error("the fixture exports an object")

  const spots = splicesIn(text, source, owner, [
    { written: "dropped", key: "heldBy" },
    { written: "put", key: "sungAt", value: DAWN },
  ])

  expect(spots).toHaveLength(2)
})

const HELD_AT = "thrumming/moots/held.moot-call.ts"

const HELD = `export const held = {
  slug: "held",
  parts: ["moot/one", "moot/two"],
  properties: [
    { mooted: "one", weight: 1 },
    { mooted: "two", weight: 2 },
  ],
} as const satisfies MootCall
`

function heldMade(written: readonly Written[]): readonly FileChange[] | string {
  return editsFor(worldOf({ [HELD_AT]: HELD }), { path: HELD_AT, written })
}

function heldBody(written: readonly Written[]): string {
  const made = heldMade(written)
  if (typeof made === "string") return made
  return bodiesIn(stating(made), worldOf({ [HELD_AT]: HELD }).base).get(HELD_AT) ?? ""
}

test("a value put into a list falls after the values that list holds", () => {
  expect(heldBody([{ written: "listed", key: "parts", value: `"moot/three"` }])).toContain(
    `["moot/one", "moot/two", "moot/three"]`
  )
})

test("a value sorting before the values a list holds still falls after them", () => {
  const body = heldBody([{ written: "listed", key: "parts", value: `"moot/alpha"` }])

  expect(body).toContain(`["moot/one", "moot/two", "moot/alpha"]`)
})

test("a key the page states nowhere gains that value as its one value in a list", () => {
  expect(heldBody([{ written: "listed", key: "namers", value: `"moot/one"` }])).toContain(
    `namers: ["moot/one"],`
  )
})

test("a value the list holds already is refused rather than held twice", () => {
  expect(heldMade([{ written: "listed", key: "parts", value: `"moot/one"` }])).toContain(
    'holds `"moot/one"` already'
  )
})

test("a key holding one value rather than a list is refused as a restatement", () => {
  expect(heldMade([{ written: "listed", key: "slug", value: `"other"` }])).toContain(
    "holds one value"
  )
})

test("the first of the values named that a list holds is the one that goes", () => {
  const body = heldBody([
    { written: "valueGone", key: "parts", values: ["moot/three", "moot/two"] },
  ])

  expect(body).toContain(`parts: ["moot/one"],`)
})

test("a list holding none of the values named is refused by its key", () => {
  const made = heldMade([{ written: "valueGone", key: "parts", values: ["moot/nine"] }])

  expect(made).toContain("`parts` holds no `moot/nine`")
})

test("a key holding no list has no value taken out of it", () => {
  const made = heldMade([{ written: "valueGone", key: "slug", values: ["held"] }])

  expect(made).toContain("holds no list")
})

test("a record put into a list falls after the records that list holds", () => {
  const body = heldBody([
    { written: "recorded", key: "properties", record: `{ mooted: "three", weight: 3 }` },
  ])

  expect(body).toContain(`{ mooted: "two", weight: 2 },\n    { mooted: "three", weight: 3 },`)
})

test("a record the list holds already is refused rather than held twice", () => {
  const made = heldMade([
    { written: "recorded", key: "properties", record: `{ mooted: "one", weight: 1 }` },
  ])

  expect(made).toContain("holds that record already")
})

test("the record that goes is the one stating the text named under the field named", () => {
  const body = heldBody([{ written: "recordGone", key: "properties", where: "mooted", is: "two" }])

  expect(body).toContain(`{ mooted: "one", weight: 1 },`)
  expect(body).not.toContain(`{ mooted: "two", weight: 2 },`)
})

test("a key stating no record is refused rather than answered as no edit", () => {
  const made = heldMade([{ written: "recordGone", key: "parts", where: "mooted", is: "two" }])

  expect(made).toContain("no record is stated under `parts`")
})

test("a key no record of which states that text is refused", () => {
  const made = heldMade([{ written: "recordGone", key: "properties", where: "mooted", is: "nine" }])

  expect(made).toContain("no record under `properties` states `nine` under `mooted`")
})
