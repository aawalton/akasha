import { expect, test } from "bun:test"
import {
  calledIn,
  spellingsIn,
  typedIn,
} from "akasha/pages/export-name/export-spelling/export-spelling.module.code.ts"

const PAGE = "akasha/one/held-one.module.ts"

const CODE = "akasha/one/held-one.module.code.ts"

const PAGE_BODY = `export type HeldOne = string

export const heldOne = { slug: "held-one" } as const
`

const CODE_BODY = `export function heldOne(): string {
  return "one"
}
`

const held = new Map([["code", "ts"]])

const textIn = (path: string): string | null => {
  if (path === PAGE) return PAGE_BODY
  return path === CODE ? CODE_BODY : null
}

test("a file exporting a type under the name is read as exporting it", () => {
  expect(typedIn(PAGE, PAGE_BODY, "HeldOne")).toBe(true)
  expect(typedIn(PAGE, PAGE_BODY, "Kept")).toBe(false)
})

test("a file exporting a function under the name is read as exporting it", () => {
  expect(calledIn(CODE, CODE_BODY, "heldOne")).toBe(true)
  expect(calledIn(CODE, CODE_BODY, "kept")).toBe(false)
})

test("a name declared without export is read as exported from nowhere", () => {
  expect(calledIn(CODE, "function heldOne(): void {}\n", "heldOne")).toBe(false)
})

test("a page's own type and its code file's name are both spelled anew", () => {
  expect(spellingsIn(textIn, PAGE, held, "held-one", "carried")).toEqual([
    { at: PAGE, of: "HeldOne", to: "Carried" },
    { at: CODE, of: "heldOne", to: "carried" },
  ])
})

test("a page stating no code file has no code file spelled", () => {
  expect(spellingsIn(textIn, PAGE, new Map(), "held-one", "carried")).toEqual([
    { at: PAGE, of: "HeldOne", to: "Carried" },
  ])
})

test("a file exporting neither name is spelled nowhere", () => {
  expect(spellingsIn(() => "export const kept = 1\n", PAGE, held, "held-one", "carried")).toEqual(
    []
  )
})
