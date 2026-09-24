import { expect, test } from "bun:test"
import { loadingIn } from "akasha/check/code/pages/no-unused-exports/modules/specifier-placing/specifier-placing.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"

const AT = "one/one.module.code.ts"

const MADE = "const loadFrom = createRequire(import.meta.url)\n"

const SPEC = "akasha/nowhere/nowhere.thing.ts"

const OTHER = "akasha/elsewhere/elsewhere.thing.ts"

function named(text: string): readonly string[] {
  return [...loadingIn(parsedAs(AT, text))]
}

test("an `import()` names a module by its argument", () => {
  expect(named(`const a = import("${SPEC}")\n`)).toEqual([SPEC])
})

test("a name handed to `import()` carries a specifier", () => {
  expect(named(`const AT = "${SPEC}"\nconst a = await import(AT)\n`)).toEqual([SPEC])
})

test("a literal handed to `require.resolve` names a module", () => {
  expect(named(`require.resolve("${SPEC}")\n`)).toEqual([SPEC])
})

test("a literal handed to `require` itself names a module", () => {
  expect(named(`require("${SPEC}")\n`)).toEqual([SPEC])
})

test("a literal handed to `resolve` on a name taken from `createRequire` names a module", () => {
  expect(named(`${MADE}loadFrom.resolve("${SPEC}")\n`)).toEqual([SPEC])
})

test("a name handed there carries a specifier", () => {
  expect(named(`${MADE}const AT = "${SPEC}"\nloadFrom.resolve(AT)\n`)).toEqual([SPEC])
})

test("a parameter handed there makes the argument at that place a specifier", () => {
  const said = "function pathOf(name) {\n  return loadFrom.resolve(name)\n}\n"
  expect(named(`${MADE}${said}const AT = "${SPEC}"\npathOf(AT)\n`)).toEqual([SPEC])
})

test("a function written as an arrow is followed like one declared", () => {
  const said = "const pathOf = (name) => loadFrom.resolve(name)\n"
  expect(named(`${MADE}${said}const AT = "${SPEC}"\npathOf(AT)\n`)).toEqual([SPEC])
})

test("only the argument at the place handed there is a specifier", () => {
  const said = "function pathOf(one, name) {\n  return loadFrom.resolve(name)\n}\n"
  const held = `const ONE = "${OTHER}"\nconst AT = "${SPEC}"\npathOf(ONE, AT)\n`
  expect(named(`${MADE}${said}${held}`)).toEqual([SPEC])
})

test("a name never handed there carries no specifier", () => {
  const held = `const AT = "${SPEC}"\nconst TWO = "${OTHER}"\nloadFrom.resolve(AT)\n`
  expect(named(`${MADE}${held}`)).toEqual([SPEC])
})

test("a `resolve` on anything else names no module", () => {
  expect(named(`const at = path.resolve("${SPEC}")\n`)).toEqual([])
})

test("a name handed to a `resolve` on anything else carries no specifier", () => {
  expect(named(`const AT = "${SPEC}"\nother.resolve(AT)\n`)).toEqual([])
})

test("a literal handed to a name taken from `createRequire` names a module", () => {
  expect(named(`${MADE}loadFrom("${SPEC}")\n`)).toEqual([SPEC])
})

test("a call on a name taken from nowhere names no module", () => {
  expect(named(`other("${SPEC}")\n`)).toEqual([])
})

test("a function handing no parameter there is followed by nothing", () => {
  const said = "function pathOf(name) {\n  return name\n}\n"
  expect(named(`${MADE}${said}const AT = "${SPEC}"\npathOf(AT)\n`)).toEqual([])
})

test("a literal sitting where no module is named names none", () => {
  expect(named(`const at = "${SPEC}"\n`)).toEqual([])
})
