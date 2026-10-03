import { afterAll, expect, test } from "bun:test"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import type { Folded } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  A_CRATE,
  A_HELD_FIGURE,
  A_HELD_THING,
  A_NEW_FIGURE,
  A_PORTRAIT_AT,
  bodyIn,
  composing,
  HELD_THING_BODY,
  keysIn,
  refusalIn,
  squadOf,
} from "akasha/page/service/modules/page-composing/page-composing.module.test-fixtures.ts"

afterAll(scratch.sweep)

const REMARK = '  remark: "what was already noted",\n'

test("a merge clearing a key writes the page without that key", () => {
  const said = composing({ ...A_HELD_THING, values: {}, merge: true, clears: ["remark"] })
  expect(HELD_THING_BODY).toContain(REMARK)
  expect(bodyIn(said)).toBe(HELD_THING_BODY.replace(REMARK, ""))
})

test("a key cleared that the page lacks is no change", () => {
  const said = composing({ ...A_CRATE, values: {}, merge: true, clears: ["remark"] })
  expect(bodyIn(said)).toBe(bodyIn(composing({ ...A_CRATE, values: {}, merge: true })))
})

test("a key cleared that the page type declares no property for is refused", () => {
  const said = composing({ ...A_HELD_THING, values: {}, merge: true, clears: ["nowhere"] })
  expect(refusalIn(said)).toContain("declares no property carried as `nowhere`")
})

test("a key both cleared and handed over is refused", () => {
  const said = composing({ ...A_HELD_THING, values: { remark: "x" }, clears: ["remark"] })
  expect(refusalIn(said)).toContain("handed over in one write")
})

test("a key kept beside the page is refused as cleared", () => {
  const said = composing({ ...A_HELD_THING, values: {}, merge: true, clears: ["lastSeenAt"] })
  expect(refusalIn(said)).toContain("kept beside the page")
})

function removesIn(said: Folded): readonly string[] {
  return "removes" in said ? said.removes : []
}

test("a key held in a file beside the page is cleared with that file", () => {
  const said = composing({ ...A_HELD_FIGURE, values: {}, clears: ["portrait"] })
  expect(refusalIn(said)).toBe("")
  expect(keysIn(said)).not.toContain("portrait")
  expect(removesIn(said)).toEqual([A_PORTRAIT_AT])
})

test("a key held in a file beside a page holding no such file is cleared taking nothing away", () => {
  const said = composing({ ...A_NEW_FIGURE, merge: true, clears: ["portrait"] })
  expect(refusalIn(said)).toBe("")
  expect(removesIn(said)).toEqual([])
})

test("a key held as rows or in a file of its own name is refused as cleared", () => {
  const rounds = composing({ ...A_HELD_FIGURE, values: {}, clears: ["rounds"] })
  expect(refusalIn(rounds)).toContain("held in a file as rows")
  const manifest = composing({ ...A_CRATE, values: {}, merge: true, clears: ["manifest"] })
  expect(refusalIn(manifest)).toContain("held in a file named `package.json`")
})

test("an optional key handed null or undefined is left off the page it was on", () => {
  for (const nothing of [null, undefined]) {
    const said = composing({ ...A_HELD_THING, values: { remark: nothing }, merge: true })
    expect(refusalIn(said)).toBe("")
    expect(bodyIn(said)).toBe(HELD_THING_BODY.replace(REMARK, ""))
  }
})

test("a new page handed null for an optional key is written without that key", () => {
  const said = squadOf({ caption: null, crest: "a lion" })
  expect(refusalIn(said)).toBe("")
  expect(keysIn(said)).not.toContain("caption")
  expect(bodyIn(said)).not.toContain("null")
})

test("a key handed null is written as null where its property is nullable", () => {
  const said = squadOf({ heldTo: null, crest: "a lion" })
  expect(refusalIn(said)).toBe("")
  expect(bodyIn(said)).toContain("heldTo: null")
})

test("a required key handed null or undefined is refused, naming the key", () => {
  for (const nothing of [null, undefined]) {
    expect(refusalIn(squadOf({ crest: nothing }))).toContain("`squad` requires `crest`")
  }
})
