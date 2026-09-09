import { expect, test } from "bun:test"
import type { Splice } from "../answer/change-answer.module.types.ts"
import { aliasIn, nameFor, spelledAnew, spelledByNaming } from "./package-naming.module.code.ts"

const NAMING = new Map([
  ["@akasha/code", "akasha/code-system/code-system.workspace-package.ts"],
  ["@akasha/code/code-source", "akasha/code-system/code-source/code-source.module.code.ts"],
])

const BY_NAMING = [
  'import { one } from "akasha/code-system/code-system.workspace-package.ts"',
  'import { two } from "akasha/code-system/code-source/code-source.module.code.ts"',
  'import { three } from "@akasha/codex"',
  'const said = "@akasha/code"',
  "",
].join("\n")

const AT = "one/held.module.code.ts"

const WAS = "@akasha/code"

const TO = "@akasha/kode"

const BODY = [
  'import { one } from "@akasha/code"',
  'import { two } from "@akasha/code/code-source"',
  'import { three } from "@akasha/codex"',
  'const said = "@akasha/code"',
  "",
].join("\n")

const RESPELLED = [
  'import { one } from "@akasha/kode"',
  'import { two } from "@akasha/kode/code-source"',
  'import { three } from "@akasha/codex"',
  'const said = "@akasha/code"',
  "",
].join("\n")

function spelledInto(text: string, spots: readonly Splice[]): string {
  let said = text
  for (const one of [...spots].sort((here, there) => there.from - here.from)) {
    said = said.slice(0, one.from) + one.put + said.slice(one.to)
  }
  return said
}

test("a name equal to the old name becomes the new name", () => {
  expect(nameFor(WAS, WAS, TO)).toBe(TO)
})

test("a name opening with the old name and a slash keeps the tail past that name", () => {
  expect(nameFor(`${WAS}/code-source`, WAS, TO)).toBe(`${TO}/code-source`)
})

test("a name opening with the old name and no slash names no package renamed", () => {
  expect(nameFor("@akasha/codex", WAS, TO)).toBeNull()
})

test("a name carrying the old name further in names no package renamed", () => {
  expect(nameFor("held/@akasha/code", WAS, TO)).toBeNull()
})

test("an alias is parted into what opens it, the package it names and the range", () => {
  const held = aliasIn("npm:@scope/name@^1.0.0")

  expect(held?.opening).toBe("npm:")
  expect(held?.named).toBe("@scope/name")
  expect(held?.range).toBe("@^1.0.0")
})

test("a value carrying no colon is no alias", () => {
  expect(aliasIn("^1.0.0")).toBeNull()
})

test("a value naming no range is no alias", () => {
  expect(aliasIn("workspace:*")).toBeNull()
})

test("a value whose last `@` opens the text after the colon is no alias", () => {
  expect(aliasIn("npm:@scope")).toBeNull()
})

test("every specifier naming the package is respelled", () => {
  expect(spelledInto(BODY, spelledAnew(AT, BODY, WAS, TO))).toBe(RESPELLED)
})

test("a string naming no module is left as that string is", () => {
  expect(spelledAnew(AT, BODY, WAS, TO).length).toBe(2)
})

test("a body naming the package nowhere is respelled nowhere", () => {
  expect(spelledAnew(AT, 'import { one } from "@akasha/pages"\n', WAS, TO)).toEqual([])
})

test("a naming handed in spells each specifier anew on its own rather than by prefix", () => {
  expect(spelledInto(BODY, spelledByNaming(AT, BODY, NAMING))).toBe(BY_NAMING)
})

test("a specifier the naming handed in does not name is left as that specifier is", () => {
  expect(spelledByNaming(AT, 'import { one } from "@akasha/codex"\n', NAMING)).toEqual([])
})
