import { afterAll, expect, test } from "bun:test"
import { namingOf } from "akasha/check/code/pages/typecheck/modules/program-naming/program-naming.module.code.ts"
import {
  DECLARED_AT,
  declared,
  judged,
  over,
  RELYING_AT,
  relying,
} from "akasha/check/code/pages/typecheck/typecheck.check-code.decision.test-fixtures.ts"
import {
  change,
  scratch,
} from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"
import { shadowAsked } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

const APART_AT = "akasha/apart.ts"

const APART = "export const apart = 1\n"

test("the program is built over the files judged and the declarations, and answers for the judged", () => {
  const held = change(relying(), { [APART_AT]: APART })
  const said = namingOf(held, shadowAsked(held), [APART_AT], [], () => false)
  expect([...said.named].sort()).toEqual([APART_AT, DECLARED_AT, RELYING_AT].sort())
  expect(said.asked).toEqual([APART_AT])
})

test("a change rooting nothing answers for every declaration the program holds", () => {
  const held = change(relying(), { [DECLARED_AT]: null })
  const said = namingOf(held, shadowAsked(held), [], [DECLARED_AT], () => false)
  expect(said.named).toEqual([RELYING_AT])
  expect(said.asked).toEqual(said.named)
})

test("a declaration file another config claims is left out of both answers", () => {
  const held = change(relying(), { [APART_AT]: APART })
  const said = namingOf(held, shadowAsked(held), [APART_AT], [], (one) => one === DECLARED_AT)
  expect([...said.named].sort()).toEqual([APART_AT, RELYING_AT].sort())
})

test("a declaration file akasha holds names a global for a change no import reaches it from", async () => {
  const root = declared({ "akasha/one.ts": "export const one = 1\n" })
  expect(await over(root, "akasha/one.ts", "export const one = HELD_ONE\n")).toEqual([])
})

test("a declaration file the change carries is judged, so a fault inside it is refused", async () => {
  const root = declared({})
  const said = await over(root, DECLARED_AT, "declare const HELD_ONE: number = 1\n")
  expect(said.map((one) => one.path)).toEqual([DECLARED_AT])
  expect(said[0]?.reason).toContain("TS1039")
})

test("a declaration file the change takes away is judged, so one relying on its global is refused", async () => {
  const said = await over(relying(), DECLARED_AT, null)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(RELYING_AT)
  expect(said[0]?.reason).toContain("TS2304")
})

test("that declaration going beside a file to root judges the file and not the declarations", async () => {
  const at = { [DECLARED_AT]: null, [APART_AT]: APART }
  expect(await judged(change(relying(), at))).toEqual([])
})
