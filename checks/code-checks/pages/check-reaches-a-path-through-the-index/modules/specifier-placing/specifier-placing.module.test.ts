import { expect, test } from "bun:test"
import { specifyingIn } from "akasha/checks/code-checks/pages/check-reaches-a-path-through-the-index/modules/specifier-placing/specifier-placing.module.code.ts"
import { parsedAs } from "akasha/code/code-source/code-source.module.code.ts"
import ts from "typescript"

const AT = "one/one.module.code.ts"

const MADE = "const loadFrom = createRequire(import.meta.url)\n"

const SPEC = "akasha/nowhere/nowhere.thing.ts"

const OTHER = "akasha/elsewhere/elsewhere.thing.ts"

function named(text: string): readonly string[] {
  const source = parsedAs(AT, text)
  const specified = specifyingIn(source)
  const found: string[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isStringLiteral(node) && specified(node)) found.push(node.text)
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return found
}

test("an import names a module by its specifier", () => {
  expect(named(`import { a } from "${SPEC}"\n`)).toEqual([SPEC])
})

test("an export names a module by its specifier", () => {
  expect(named(`export { a } from "${SPEC}"\n`)).toEqual([SPEC])
})

test("an `import()` names a module by its argument", () => {
  expect(named(`const a = import("${SPEC}")\n`)).toEqual([SPEC])
})

test("an import type names a module by the literal in its type argument", () => {
  expect(named(`type A = import("${SPEC}").A\n`)).toEqual([SPEC])
})

test("a literal handed to `require.resolve` names a module", () => {
  expect(named(`require.resolve("${SPEC}")\n`)).toEqual([SPEC])
})

test("the first literal a test hands `mock.module` names a module", () => {
  expect(named(`mock.module("${SPEC}", () => ({ a: 1 }))\n`)).toEqual([SPEC])
})

test("a name handed to `mock.module` rather than a literal is not followed", () => {
  expect(named(`const AT = "${SPEC}"\nmock.module(AT, () => ({ a: 1 }))\n`)).toEqual([])
})

test("a `module` call on anything but `mock` names no module", () => {
  expect(named(`other.module("${SPEC}", () => ({ a: 1 }))\n`)).toEqual([])
})

test("another call on `mock` names no module", () => {
  expect(named(`mock.other("${SPEC}", () => ({ a: 1 }))\n`)).toEqual([])
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

test("a require called rather than resolved names no module", () => {
  expect(named(`${MADE}loadFrom("${SPEC}")\n`)).toEqual([])
})

test("a function handing no parameter there is followed by nothing", () => {
  const said = "function pathOf(name) {\n  return name\n}\n"
  expect(named(`${MADE}${said}const AT = "${SPEC}"\npathOf(AT)\n`)).toEqual([])
})

test("a literal sitting where no module is named names none", () => {
  expect(named(`const at = "${SPEC}"\n`)).toEqual([])
})
