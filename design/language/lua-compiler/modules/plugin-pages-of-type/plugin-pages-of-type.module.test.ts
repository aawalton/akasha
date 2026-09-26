import { expect, test } from "bun:test"
import * as lua from "akasha/design/language/lua-compiler/modules/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import {
  type PagesOf,
  pagesTableFor,
} from "akasha/design/language/lua-compiler/modules/plugin-pages-of-type/plugin-pages-of-type.module.code.ts"
import * as ts from "typescript"

const AT = "at.ts"

const SOURCE = [
  "declare function $pagesOfType<T>(pageType: { readonly slug: string }): T",
  "declare function other(given: unknown): number",
  'const zone = { slug: "zone" } as const',
  "interface Kind { readonly kind: number }",
  "export const kinds = $pagesOfType<Kind>(zone)",
  "export const every = $pagesOfType(zone)",
  "export const plain = other(zone)",
  "export const unnamed = $pagesOfType({})",
].join("\n")

const pagesHeld: PagesOf = (root, slug) =>
  root === "root" && slug === "zone"
    ? [
        { path: "b.ts", value: { kind: 2, name: "b", held: [1, null, 3] } },
        { path: "a.ts", value: { kind: 1, name: "a", gone: null, at: { x: true } } },
      ]
    : []

function compiled(): { readonly checker: ts.TypeChecker; readonly calls: ts.CallExpression[] } {
  const file = ts.createSourceFile(AT, SOURCE, ts.ScriptTarget.ESNext, true)
  const options = { noLib: true, types: [] }
  const host = ts.createCompilerHost(options)
  host.getSourceFile = (name) => (name === AT ? file : undefined)
  const program = ts.createProgram([AT], options, host)
  const calls: ts.CallExpression[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node)) calls.push(node)
    ts.forEachChild(node, visit)
  }
  visit(file)
  return { checker: program.getTypeChecker(), calls }
}

function heldIn(expression: lua.Expression | undefined): unknown {
  if (expression === undefined) return undefined
  if (lua.isStringLiteral(expression) || lua.isNumericLiteral(expression)) return expression.value
  if (lua.isBooleanLiteral(expression))
    return expression.kind === lua.createBooleanLiteral(true).kind
  if (!lua.isTableExpression(expression)) return null
  if (expression.fields.every((one) => one.key === undefined)) {
    return expression.fields.map((one) => heldIn(one.value))
  }
  return Object.fromEntries(expression.fields.map((one) => [heldIn(one.key), heldIn(one.value)]))
}

function tableAt(index: number): unknown {
  const { checker, calls } = compiled()
  const call = calls[index]
  if (call === undefined) throw new Error(`no call ${String(index)}`)
  const made = pagesTableFor(call, checker, "root", pagesHeld)
  return made === null ? null : heldIn(made)
}

test("a call naming a type keeps only that type's properties, in the order of the paths", () => {
  expect(tableAt(0)).toEqual([{ kind: 1 }, { kind: 2 }])
})

test("a call naming no type keeps every property but those holding null", () => {
  expect(tableAt(1)).toEqual([
    { kind: 1, name: "a", at: { x: true } },
    { kind: 2, name: "b", held: [1, 3] },
  ])
})

test("a call to anything else is left to the compiler", () => {
  expect(tableAt(2)).toBe(null)
})

test("a call handed no page carrying a slug refuses the compile", () => {
  expect(() => tableAt(3)).toThrow("is handed no page whose slug is known")
})
