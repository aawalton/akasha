import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import {
  boundAs,
  compiled,
  declarationsNamed,
  declaredNamed,
  declaredOn,
  exportsNamed,
  insideOf,
  keyingsIn,
  manifested,
  manifestOf,
  namingOf,
  readingOf,
  referencesOf,
  servedOf,
  spelledAs,
} from "./code-typing.module.code.ts"
import { linked, PACKAGED, scratch, typed } from "./code-typing.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a body reached through the packages folder is served from inside the akasha folder", () => {
  const root = linked({ "akasha/one/package.json": '{ "name": "@akasha/one" }\n' }, "one")

  expect(servedOf(root, join(root, PACKAGED, "one/two/two.module.code.ts"))).toBe(
    "akasha/one/two/two.module.code.ts"
  )
})

test("a body the change brings is served through the packages folder though no disk holds it", () => {
  const root = linked({ "akasha/one/package.json": '{ "name": "@akasha/one" }\n' }, "one")
  const body = "export const two = 2\n"
  const read = readingOf(root, (rel) => (rel === "akasha/one/two.module.code.ts" ? body : null))

  expect(read(join(root, PACKAGED, "one/two.module.code.ts"))).toBe(body)
})

test("a body the change takes away reads as nothing through the packages folder", () => {
  const root = linked({ "akasha/one/two.module.code.ts": "export const two = 2\n" }, "one")
  const read = readingOf(root, () => null)

  expect(read(join(root, PACKAGED, "one/two.module.code.ts"))).toBe(undefined)
})

test("a manifest is known by the name of the file holding it wherever it sits", () => {
  expect(manifested("package.json")).toBe(true)
  expect(manifested("akasha/one/package.json")).toBe(true)
  expect(manifested("akasha/one/one.module.code.ts")).toBe(false)
  expect(manifested("akasha/one/my-package.json")).toBe(false)
})

test("a manifest reached through the packages folder is answered where it links to", () => {
  const root = linked({ "akasha/one/package.json": '{ "name": "@akasha/one" }\n' }, "one")

  expect(manifestOf(root, join(root, PACKAGED, "one/package.json"))).toBe("akasha/one/package.json")
  expect(manifestOf(root, join(root, "akasha/one/package.json"))).toBe("akasha/one/package.json")
  expect(manifestOf(root, join(root, "package.json"))).toBe(null)
  expect(manifestOf(root, join(root, "akasha/one/one.module.code.ts"))).toBe(null)
})

test("the program is served a body it compiles and a manifest reaching one alike", () => {
  const root = linked({ "akasha/one/package.json": '{ "name": "@akasha/one" }\n' }, "one")

  expect(servedOf(root, join(root, "akasha/one/one.module.code.ts"))).toBe(
    "akasha/one/one.module.code.ts"
  )
  expect(servedOf(root, join(root, PACKAGED, "one/package.json"))).toBe("akasha/one/package.json")
  expect(servedOf(root, join(root, "tools/one.ts"))).toBe(null)
})

test("a manifest the change carries is read from the change where resolution asks for it", () => {
  const root = linked({ "akasha/one/package.json": '{ "name": "@akasha/one" }\n' }, "one")
  const carried = '{ "name": "@akasha/one", "exports": { ".": "./one.module.code.ts" } }\n'
  const read = readingOf(root, (rel) => (rel === "akasha/one/package.json" ? carried : null))

  expect(read(join(root, PACKAGED, "one/package.json"))).toBe(carried)
})

test("a manifest the change does not carry is read as the disk holds it", () => {
  const body = '{ "name": "@akasha/one" }\n'
  const root = linked({ "akasha/one/package.json": body }, "one")
  const read = readingOf(root, () => null)

  expect(read(join(root, PACKAGED, "one/package.json"))).toBe(body)
  expect(read(join(root, "akasha/one/package.json"))).toBe(body)
})

test("every place one file spells a key is answered with what a shorthand there names", () => {
  const at = "akasha/welded.module.code.ts"
  const { typing } = typed({
    [at]:
      "export type Held = { readonly keyed: readonly string[] }\n" +
      "export function heldOf(said: readonly string[]): Held {\n" +
      "  const keyed = [...said]\n" +
      "  return { keyed }\n" +
      "}\n",
  })
  const found = keyingsIn(typing, at, "keyed")
  const declared = declaredNamed(typing, at, "keyed")

  expect(found.map((one) => one.declares)).toEqual([true, false])
  expect(found[1]?.names.length).toBe(1)
  expect(found[1]?.names[0] === declared[0]).toBe(true)
})

test("a key written out names nothing the checker could weld a name to", () => {
  const at = "akasha/apart.module.code.ts"
  const { typing } = typed({
    [at]:
      "export type Held = { readonly keyed: readonly string[] }\n" +
      "export function heldOf(said: readonly string[]): Held {\n" +
      "  return { keyed: said }\n" +
      "}\n",
  })
  const found = keyingsIn(typing, at, "keyed")
  const declared = declarationsNamed(typing, at, "keyed")

  expect(found).toHaveLength(2)
  expect(found[1]?.declares).toBe(false)
  expect(found[1]?.names).toEqual([])
  expect(found[1]?.keys).toContain(declared[0])
})

test("a key one part of a union alone declares is resolved through that part", () => {
  const at = "akasha/parted.module.code.ts"
  const { root, typing } = typed({
    [at]:
      "export type Held = { readonly keyed: readonly string[] } | { readonly refused: string }\n" +
      "export function heldOf(said: readonly string[]): Held {\n" +
      "  return { keyed: said }\n" +
      "}\n",
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
      "export type Held = One | Two | Three\n" +
      "export function heldOf(said: readonly string[]): Held {\n" +
      "  return { keyed: said }\n" +
      "}\n",
  })
  const declared = declarationsNamed(typing, at, "keyed")
  const naming = namingOf(typing, root, new Set(declared.slice(0, 1)))

  expect(declared).toHaveLength(2)
  expect(naming).toHaveLength(1)
})

test("a path inside the akasha folder compiles and one outside it does not", () => {
  expect(compiled("akasha/one/one.module.code.ts")).toBe(true)
  expect(compiled("tools/one.ts")).toBe(false)
  expect(compiled("akasha/one/one.module.json")).toBe(false)
  expect(compiled("akasha/node_modules/one/one.ts")).toBe(false)
})

test("a path under the root is answered relative and one outside it is not", () => {
  expect(insideOf("/at", "/at/akasha/one.ts")).toBe("akasha/one.ts")
  expect(insideOf("/at", "/elsewhere/akasha/one.ts")).toBe(null)
  expect(insideOf("/at", "/at/tools/one.ts")).toBe(null)
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

test("a respelling states the value a shorthand stood for and keeps a string's quotes", () => {
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

test("a name shadowing an imported one inside a scope is left as it stands", () => {
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

test("a binding a shorthand stood for is stated rather than the key being renamed", () => {
  const plain = { path: "at", start: 0, end: 1, quoted: false, shorthand: false }

  expect(boundAs(plain, "was", "now")).toBe("now")
  expect(boundAs({ ...plain, shorthand: true }, "was", "now")).toBe("was: now")
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
