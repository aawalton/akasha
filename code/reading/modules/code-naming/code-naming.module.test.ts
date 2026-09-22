import { afterAll, expect, test } from "bun:test"
import {
  boundAs,
  declaredNamed,
  declaredOn,
  exportsNamed,
  namingOf,
  referencesOf,
  spelledAs,
} from "akasha/code/reading/modules/code-naming/code-naming.module.code.ts"
import {
  declarationsNamed,
  KEYS_SAID,
  scratch,
  typed,
} from "akasha/code/reading/modules/code-naming/code-naming.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a key one part of a union alone declares is resolved through that part", () => {
  const at = "akasha/parted.module.code.ts"
  const { root, typing } = typed({
    [at]: `export type Held = { readonly keyed: readonly string[] } | { readonly refused: string }\n${KEYS_SAID}`,
  })
  const naming = namingOf(typing, root, new Set(declarationsNamed(typing, at, "keyed")))

  expect(naming).toHaveLength(2)
})

test("a key more than one part of a union declares apart is resolved through none of them", () => {
  const at = "akasha/split.module.code.ts"
  const { root, typing } = typed({
    [at]:
      "type One = { readonly keyed: readonly string[] }\n" +
      "type Two = { readonly keyed: number }\n" +
      "type Three = { readonly other: string }\n" +
      `export type Held = One | Two | Three\n${KEYS_SAID}`,
  })
  const declared = declarationsNamed(typing, at, "keyed")
  const naming = namingOf(typing, root, new Set(declared.slice(0, 1)))

  expect(declared).toHaveLength(2)
  expect(naming).toHaveLength(1)
})

test("a key is found where it is declared and everywhere the checker resolves to it", () => {
  const { root, typing } = typed({
    "akasha/held.page-type.ts": "export type Held = { keyed: string }\n",
    "akasha/reader.module.code.ts":
      'import type { Held } from "./held.page-type.ts"\n' +
      "export function readOf(one: Held): string {\n  return one.keyed\n}\n",
  })
  const declared = declarationsNamed(typing, "akasha/held.page-type.ts", "keyed")

  expect(declared).toHaveLength(1)

  const naming = namingOf(typing, root, new Set(declared))

  expect(naming).toHaveLength(2)
  expect(new Set(naming.map((one) => one.path))).toEqual(
    new Set(["akasha/held.page-type.ts", "akasha/reader.module.code.ts"])
  )
})

test("two types carrying one key are told apart by where each is declared", () => {
  const { root, typing } = typed({
    "akasha/one.page-type.ts": "export type One = { keyed: string }\n",
    "akasha/two.page-type.ts": "export type Two = { keyed: string }\n",
    "akasha/reader.module.code.ts":
      'import type { One } from "./one.page-type.ts"\n' +
      'import type { Two } from "./two.page-type.ts"\n' +
      "export function readOf(one: One, two: Two): string {\n  return `${one.keyed}${two.keyed}`\n}\n",
  })
  const naming = namingOf(
    typing,
    root,
    new Set(declarationsNamed(typing, "akasha/one.page-type.ts", "keyed"))
  )

  expect(naming).toHaveLength(2)
  expect(naming.filter((one) => one.path === "akasha/two.page-type.ts")).toEqual([])
})

test("a key stated in a literal is resolved through the type that literal satisfies", () => {
  const { root, typing } = typed({
    "akasha/held.page-type.ts": "export type Held = { keyed: string }\n",
    "akasha/one.module.code.ts":
      'import type { Held } from "./held.page-type.ts"\n' +
      'export const one = { keyed: "said" } as const satisfies Held\n',
  })
  const naming = namingOf(
    typing,
    root,
    new Set(declarationsNamed(typing, "akasha/held.page-type.ts", "keyed"))
  )

  expect(naming.map((one) => one.path)).toContain("akasha/one.module.code.ts")
})

test("a key taken apart in a binding is found and named as shorthand", () => {
  const { root, typing } = typed({
    "akasha/held.page-type.ts": "export type Held = { keyed: string }\n",
    "akasha/one.module.code.ts":
      'import type { Held } from "./held.page-type.ts"\n' +
      "export function readOf(one: Held): string {\n  const { keyed } = one\n  return keyed\n}\n",
  })
  const naming = namingOf(
    typing,
    root,
    new Set(declarationsNamed(typing, "akasha/held.page-type.ts", "keyed"))
  )
  const held = naming.filter((one) => one.path === "akasha/one.module.code.ts")

  expect(held).toHaveLength(1)
  expect(held[0]?.shorthand).toBe(true)
})

test("a key reached by a string is found and named as quoted", () => {
  const { root, typing } = typed({
    "akasha/held.page-type.ts": "export type Held = { keyed: string }\n",
    "akasha/one.module.code.ts":
      'import type { Held } from "./held.page-type.ts"\n' +
      'export function readOf(one: Held): string {\n  return one["keyed"]\n}\n',
  })
  const naming = namingOf(
    typing,
    root,
    new Set(declarationsNamed(typing, "akasha/held.page-type.ts", "keyed"))
  )
  const held = naming.filter((one) => one.path === "akasha/one.module.code.ts")

  expect(held).toHaveLength(1)
  expect(held[0]?.quoted).toBe(true)
})

test("a respelling states the value a shorthand represented and keeps a string's quotes", () => {
  const plain = { path: "at", start: 0, end: 1, quoted: false, shorthand: false }

  expect(spelledAs(plain, "was", "now")).toBe("now")
  expect(spelledAs({ ...plain, shorthand: true }, "was", "now")).toBe("now: was")
  expect(spelledAs({ ...plain, quoted: true }, "was", "now")).toBe('"now"')
})

test("a name is found where it is exported and everywhere the checker resolves to it", () => {
  const { root, typing } = typed({
    "akasha/seat.page-type.ts": 'export const seat = { id: "one" }\n',
    "akasha/reader.module.code.ts":
      'import { seat } from "./seat.page-type.ts"\n' +
      "export function ownOf(): string {\n  return seat.id\n}\n",
  })
  const declared = exportsNamed(typing, "akasha/seat.page-type.ts", "seat")

  expect(declared).toHaveLength(1)

  const found = referencesOf(typing, root, new Set(declared))

  expect(found.filter((one) => one.path === "akasha/reader.module.code.ts")).toHaveLength(2)
})

test("a name shadowing an imported one inside a scope is left as it is", () => {
  const { root, typing } = typed({
    "akasha/seat.page-type.ts": 'export const seat = { id: "one" }\n',
    "akasha/reader.module.code.ts":
      'import { seat } from "./seat.page-type.ts"\n' +
      "export function firstOf(said: readonly { id: string }[]): string {\n" +
      "  const seat = said[0]\n" +
      '  return seat === undefined ? "" : seat.id\n' +
      "}\n" +
      "export function ownOf(): string {\n  return seat.id\n}\n",
  })
  const found = referencesOf(
    typing,
    root,
    new Set(exportsNamed(typing, "akasha/seat.page-type.ts", "seat"))
  )
  const held = found.filter((one) => one.path === "akasha/reader.module.code.ts")

  expect(held).toHaveLength(2)
})

test("a name imported under another is found where it is imported and not where it is used", () => {
  const { root, typing } = typed({
    "akasha/seat.page-type.ts": 'export const seat = { id: "one" }\n',
    "akasha/reader.module.code.ts":
      'import { seat as chair } from "./seat.page-type.ts"\n' +
      "export function ownOf(): string {\n  return chair.id\n}\n",
  })
  const found = referencesOf(
    typing,
    root,
    new Set(exportsNamed(typing, "akasha/seat.page-type.ts", "seat"))
  )
  const held = found.filter((one) => one.path === "akasha/reader.module.code.ts")

  expect(held).toHaveLength(1)
})

test("a type is found through the name it is declared under", () => {
  const { root, typing } = typed({
    "akasha/seat.page-type.ts": "export type Seat = { id: string }\n",
    "akasha/reader.module.code.ts":
      'import type { Seat } from "./seat.page-type.ts"\n' +
      "export function ownOf(one: Seat): string {\n  return one.id\n}\n",
  })
  const found = referencesOf(
    typing,
    root,
    new Set(exportsNamed(typing, "akasha/seat.page-type.ts", "Seat"))
  )

  expect(found.filter((one) => one.path === "akasha/reader.module.code.ts")).toHaveLength(2)
})

test("a binding a shorthand represented is stated rather than the key being renamed", () => {
  const plain = { path: "at", start: 0, end: 1, quoted: false, shorthand: false }

  expect(boundAs(plain, "was", "now")).toBe("now")
  expect(boundAs({ ...plain, shorthand: true }, "was", "now")).toBe("was: now")
  expect(boundAs({ ...plain, quoted: true }, "was", "now")).toBe('"now"')
})

const GLOBALS = "akasha/globals.type-declaration.d.ts"

const WRITER = "akasha/writer.module.code.ts"

const OUTSIDE = "akasha/outside.module.code.ts"

const GLOBALS_BODY =
  "declare const TemperConst: number\n" +
  "declare var TemperVar: number\n" +
  "declare const _G: typeof globalThis & Record<string, unknown>\n"

const WRITER_BODY =
  'import "./globals.type-declaration.d.ts"\n' +
  "\n" +
  "export function setUp(): undefined {\n" +
  "  _G.TemperConst = 1\n" +
  '  _G["TemperConst"] = 1\n' +
  "  _G.TemperVar = 1\n" +
  '  _G["TemperVar"] = 1\n' +
  "  globalThis.TemperVar = 1\n" +
  "}\n"

const OUTSIDE_BODY =
  "export function heldOf(one: Record<string, unknown>): unknown {\n" +
  "  return one.TemperConst\n" +
  "}\n"

test("a global assigned on the global table is found by a name and by a string alike", () => {
  const { root, typing } = typed({ [GLOBALS]: GLOBALS_BODY, [WRITER]: WRITER_BODY })
  const found = referencesOf(typing, root, new Set(declaredNamed(typing, GLOBALS, "TemperConst")))
  const held = found.filter((one) => one.path === WRITER)

  expect(held).toHaveLength(2)
  expect(held.filter((one) => one.quoted)).toHaveLength(1)
})

test("a global the checker resolves on globalThis is found once at each of its spellings", () => {
  const { root, typing } = typed({ [GLOBALS]: GLOBALS_BODY, [WRITER]: WRITER_BODY })
  const found = referencesOf(typing, root, new Set(declaredNamed(typing, GLOBALS, "TemperVar")))
  const held = found.filter((one) => one.path === WRITER)

  expect(held).toHaveLength(3)
  expect(held.filter((one) => one.quoted)).toHaveLength(1)
})

test("a key of that spelling on a table that is not the global table is left as it is", () => {
  const { root, typing } = typed({
    [GLOBALS]: GLOBALS_BODY,
    [WRITER]: WRITER_BODY,
    [OUTSIDE]: OUTSIDE_BODY,
  })
  const found = referencesOf(typing, root, new Set(declaredNamed(typing, GLOBALS, "TemperConst")))

  expect(found.filter((one) => one.path === OUTSIDE)).toEqual([])
})

test("where a declaration's name starts is answered as a line counted from one", () => {
  const at = "akasha/twice.module.code.ts"
  const { typing } = typed({
    [at]:
      "export function held(): string {\n" +
      '  const held = "one"\n' +
      "  return held\n" +
      "}\n" +
      "\n" +
      "export function second(): string {\n" +
      '  const held = "two"\n' +
      "  return held\n" +
      "}\n",
  })
  const found = declaredNamed(typing, at, "held")

  expect(found.map((one) => declaredOn(typing, at, one))).toEqual([1, 2, 7])
})

test("a line asked of a path the program never took in is answered as nothing", () => {
  const at = "akasha/one.module.code.ts"
  const { typing } = typed({ [at]: "export const one = 1\n" })
  const found = declaredNamed(typing, at, "one")
  const node = found[0]

  expect(found).toHaveLength(1)
  expect(node === undefined ? "unfound" : declaredOn(typing, "akasha/nowhere.ts", node)).toBe(null)
})
