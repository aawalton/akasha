import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import {
  everyShapeIn,
  reasonsIn,
  shapesIn,
} from "./no-second-spelling-of-a-name-format.code-check.decision.code.ts"
import {
  bothArriving,
  DASH_CODE,
  KEBAB_CODE,
  OTHER_CODE,
  rooted,
  SHAPE,
  SPELLING,
  STATED,
  STATING,
  scratch,
} from "./no-second-spelling-of-a-name-format.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("a shape a name format states, spelled in another file, is refused", () => {
  const said = reasonsIn(OTHER_CODE, SPELLING, STATED)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(KEBAB_CODE)
  expect(said[0]).toContain("line 1")
  expect(said[0]).toContain("belongs to its own page")
})

test("a name format spelling its own shape is passed over", () => {
  expect(reasonsIn(KEBAB_CODE, STATING, STATED)).toEqual([])
})

test("two name formats stating one shape refuse neither, that being another matter", () => {
  const both: ReadonlyMap<string, readonly string[]> = new Map([[SHAPE, [KEBAB_CODE, DASH_CODE]]])
  expect(reasonsIn(KEBAB_CODE, STATING, both)).toEqual([])
  expect(reasonsIn(DASH_CODE, STATING, both)).toEqual([])
})

test("a shape no name format states is passed over", () => {
  expect(reasonsIn(OTHER_CODE, "const ONE = /^[0-9]+$/\n", STATED)).toEqual([])
})

test("the flags a regex carries are no part of its shape", () => {
  expect(reasonsIn(OTHER_CODE, `const SLUG = /${SHAPE}/u\n`, STATED)).toHaveLength(1)
})

test("a shape written in a string is no regex literal and says nothing", () => {
  expect(reasonsIn(OTHER_CODE, `const SLUG = "/${SHAPE}/"\n`, STATED)).toEqual([])
})

test("a shape handed straight to a call is seen, wherever it is written", () => {
  expect(reasonsIn(OTHER_CODE, `export const held = matching(/${SHAPE}/)\n`, STATED)).toHaveLength(
    1
  )
})

test("the line a shape sits on is the line the refusal names", () => {
  const said = reasonsIn(OTHER_CODE, `const ONE = 1\nconst SLUG = /${SHAPE}/\n`, STATED)
  expect(said[0]).toContain("line 2")
})

test("every regex literal a body holds is read, each with the line it sits on", () => {
  expect(shapesIn(OTHER_CODE, "const A = /a/\nconst B = /b/g\n")).toEqual([
    { shape: "a", line: 1 },
    { shape: "b", line: 2 },
  ])
})

test("a name format arriving in a change states its shape to the check", () => {
  const change = bothArriving(rooted())
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  expect([...(everyShapeIn(change, cast.shadow).get(SHAPE) ?? [])]).toEqual([KEBAB_CODE])
})
