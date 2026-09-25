import { expect, test } from "bun:test"
import {
  ANYTHING,
  takingIn,
} from "akasha/check/code/pages/no-unused-exports/modules/import-losing/import-losing.module.code.ts"

const AT = "akasha/held.module.code.ts"

const READER = "akasha/reader.module.code.ts"

const SPELLED = `akasha/${AT}`

function takenFrom(text: string): readonly string[] {
  const held = takingIn(READER, text).get(AT)
  if (held === undefined) return []
  return held.has(ANYTHING) ? [ANYTHING] : [...held]
}

test("the names an importer takes from one file are read off its import", () => {
  expect(takenFrom(`import { held } from "${SPELLED}"\n`)).toEqual(["held"])
})

test("a type-only import takes the type it names", () => {
  expect(takenFrom(`import type { Held } from "${SPELLED}"\n`)).toEqual(["Held"])
  expect(takenFrom(`import { type Held } from "${SPELLED}"\n`)).toEqual(["Held"])
})

test("an import of the default takes the default", () => {
  expect(takenFrom(`import held from "${SPELLED}"\n`)).toEqual(["default"])
})

test("a file naming another in an import expression takes every name that file exports", () => {
  expect(takenFrom(`export type Every = typeof import("${SPELLED}")\n`)).toEqual([ANYTHING])
})

test("an import expression naming another file takes nothing from this one", () => {
  const text = 'export type Every = typeof import("akasha/elsewhere.module.code.ts")\n'

  expect(takenFrom(text)).toEqual([])
})

test("a dynamic import naming another file takes every name that file exports", () => {
  expect(takenFrom(`const held = await import("${SPELLED}")\n`)).toEqual([ANYTHING])
})

test("a specifier named by a string constant in the same file is read as that string", () => {
  const text = `const HELD_AT = "${SPELLED}"\nconst held = await import(HELD_AT)\n`

  expect(takenFrom(text)).toEqual([ANYTHING])
})

test("a specifier a local function was handed is read one hop back to what the caller named", () => {
  const text =
    `const HELD_AT = "${SPELLED}"\n` +
    "function loadFrom(name: string) {\n" +
    "  return import(name)\n" +
    "}\n" +
    "const held = loadFrom(HELD_AT)\n"

  expect(takenFrom(text)).toEqual([ANYTHING])
})

test("an import of another file names nothing taken from this one", () => {
  expect(takenFrom('import { held } from "akasha/elsewhere.module.code.ts"\n')).toEqual([])
})
