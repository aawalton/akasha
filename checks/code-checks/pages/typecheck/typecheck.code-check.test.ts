import { afterAll, expect, test } from "bun:test"
import { shadowAsked } from "@akasha/pages/shadow"
import { typecheck } from "./typecheck.code-check.code.ts"
import {
  change,
  numbered,
  ONE_NUMBER,
  scratch,
  TWO_BREAKS,
} from "./typecheck.code-check.decision.test-fixtures.ts"

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
