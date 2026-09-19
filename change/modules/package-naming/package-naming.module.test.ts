import { expect, test } from "bun:test"
import type { Splice } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  nameFor,
  spelledAnew,
} from "akasha/change/modules/package-naming/package-naming.module.code.ts"

const AT = "one/held.module.code.ts"

const WAS = "@held/one"

const TO = "@held/two"

const BODY = [
  'import { one } from "@held/one"',
  'import { two } from "@held/one/deep"',
  'import { three } from "@held/oner"',
  'const said = "@held/one"',
  "",
].join("\n")

const RESPELLED = [
  'import { one } from "@held/two"',
  'import { two } from "@held/two/deep"',
  'import { three } from "@held/oner"',
  'const said = "@held/one"',
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
  expect(nameFor(`${WAS}/deep`, WAS, TO)).toBe(`${TO}/deep`)
})

test("a name opening with the old name and no slash names no package renamed", () => {
  expect(nameFor("@held/oner", WAS, TO)).toBeNull()
})

test("a name carrying the old name further in names no package renamed", () => {
  expect(nameFor("deep/@held/one", WAS, TO)).toBeNull()
})

test("every specifier naming the package is respelled", () => {
  expect(spelledInto(BODY, spelledAnew(AT, BODY, WAS, TO))).toBe(RESPELLED)
})

test("a string naming no module is left as that string is", () => {
  expect(spelledAnew(AT, BODY, WAS, TO).length).toBe(2)
})

test("a body naming the package nowhere is respelled nowhere", () => {
  expect(spelledAnew(AT, 'import { one } from "@held/other"\n', WAS, TO)).toEqual([])
})
