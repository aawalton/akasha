import { afterAll, expect, test } from "bun:test"
import {
  everyShapeIn,
  reasonsIn,
  shapesIn,
  statedIn,
} from "akasha/check/code/pages/no-second-spelling-of-a-name-format/no-second-spelling-of-a-name-format.check-code.decision.code.ts"
import {
  bothArriving,
  DASH_CODE,
  filed,
  KEBAB_CODE,
  OTHER_CODE,
  rooted,
  SHAPE,
  SPELLING,
  STATED,
  STATING,
  scratch,
} from "akasha/check/code/pages/no-second-spelling-of-a-name-format/no-second-spelling-of-a-name-format.check-code.decision.test-fixtures.ts"
import { arriving } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"

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

test("a format's shape is the regex that format hands to matching", () => {
  expect(statedIn(KEBAB_CODE, STATING)).toEqual([{ shape: SHAPE, line: 1 }])
})

test("a regex a format's writer uses is no shape that format states", () => {
  const writing = `${STATING}const JOIN = /-([a-z0-9])/g\nexport const written = (one: string) => one.replace(JOIN, "")\n`
  expect(statedIn(KEBAB_CODE, writing)).toEqual([{ shape: SHAPE, line: 1 }])
})

test("a name format arriving in a change states its shape to the check", () => {
  const change = bothArriving(rooted())
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  expect([...(everyShapeIn(change, cast.shadow).get(SHAPE) ?? [])]).toEqual([KEBAB_CODE])
})

test("a name format the index files states its shape, though the change carries neither its page nor its code", () => {
  const change = arriving(filed(rooted()), { [OTHER_CODE]: SPELLING })
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  expect([...(everyShapeIn(change, cast.shadow).get(SHAPE) ?? [])]).toEqual([KEBAB_CODE])
})
