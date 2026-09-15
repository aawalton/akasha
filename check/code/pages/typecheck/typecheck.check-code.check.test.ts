import { afterAll, expect, test } from "bun:test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { typecheck } from "akasha/check/code/pages/typecheck/typecheck.check-code.check.code.ts"
import {
  GONE_AT,
  numbered,
  ONE_NUMBER,
  RACED_AT,
  routing,
  shut,
  TWO_BREAKS,
  vanishing,
} from "akasha/check/code/pages/typecheck/typecheck.check-code.decision.test-fixtures.ts"
import {
  change,
  scratch,
} from "akasha/check/test-fixtures/staging/check-staging.test-fixture.code.ts"
import { shadowAsked } from "akasha/page/modules/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

const CODE_AT = "akasha/one.ts"

const MANIFEST_AT = "akasha/package.json"

const NOTES_AT = "akasha/notes.txt"

test("a body of TypeScript is input to this check", () => {
  expect(typecheck.isInput(CODE_AT, {} as never)).toBe(true)
})

test("a package manifest is input to this check", () => {
  expect(typecheck.isInput(MANIFEST_AT, {} as never)).toBe(true)
})

test("a file that is neither TypeScript nor a manifest is no input", () => {
  expect(typecheck.isInput(NOTES_AT, {} as never)).toBe(false)
})

test("a body the change carries whose type does not hold is refused", async () => {
  const root = numbered()
  const given = change(root, { [CODE_AT]: TWO_BREAKS })
  const said = await typecheck(given, shadowAsked(given))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(CODE_AT)
})

test("a body the change carries that compiles is refused nothing", async () => {
  const root = numbered()
  const given = change(root, { [CODE_AT]: ONE_NUMBER })
  expect(await typecheck(given, shadowAsked(given))).toEqual([])
})

test("a file taken away after the check read it is judged on the body that read got", async () => {
  const given = vanishing()
  const said = await typecheck(given, shadowAsked(given))
  expect(existsSync(join(given.root, RACED_AT))).toBe(false)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(RACED_AT)
})

test("a diagnostic landing on generated route types is dropped rather than reported", async () => {
  const given = change(routing(), { [GONE_AT]: null })
  expect(await typecheck(given, shadowAsked(given))).toEqual([])
})

test("a file that is there and will not open refuses the run rather than the file", async () => {
  const given = shut()
  await expect(typecheck(given, shadowAsked(given))).rejects.toThrow("would not open")
})
