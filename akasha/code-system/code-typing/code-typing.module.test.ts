import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import type { Typing } from "./code-typing.module.code.ts"
import {
  boundAs,
  compiled,
  declarationsNamed,
  exportsNamed,
  insideOf,
  namingOf,
  referencesOf,
  spelledAs,
  typingOver,
} from "./code-typing.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function stood(root: string, said: Readonly<Record<string, string>>): string[] {
  for (const [path, text] of Object.entries(said)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, text)
  }
  return Object.keys(said)
}

function onDisk(at: string): string | undefined {
  try {
    return readFileSync(at, "utf8")
  } catch {
    return undefined
  }
}

function typed(said: Readonly<Record<string, string>>): {
  root: string
  typing: Typing
} {
  const root = scratch.rootFor("akasha-typing-")
  const paths = stood(root, said)
  const typing = typingOver(root, paths, (at) => {
    const rel = insideOf(root, at)
    return rel === null ? onDisk(at) : said[rel]
  })
  return { root, typing }
}

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
