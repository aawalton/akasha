import type { TransformationContext } from "akasha/design/language/lua-compiler/modules/context-transformation-context/context-transformation-context.module.code.ts"
import * as lua from "akasha/design/language/lua-compiler/modules/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import type { Plugin } from "akasha/design/language/lua-compiler/modules/transpile-plugins/transpile-plugins.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import * as ts from "typescript"

const CALLED = "$pagesOfType"

const SLUG = "slug"

type Paged = {
  readonly path: string
  readonly value: Readonly<Record<string, unknown>>
}

export type PagesOf = (root: string, pageTypeSlug: string) => readonly Paged[]

function kept(held: unknown): boolean {
  return held !== null && held !== undefined
}

export function luaOf(held: unknown): lua.Expression {
  if (typeof held === "string") return lua.createStringLiteral(held)
  if (typeof held === "number") return lua.createNumericLiteral(held)
  if (typeof held === "boolean") return lua.createBooleanLiteral(held)
  if (Array.isArray(held)) {
    return lua.createTableExpression(
      held.filter(kept).map((one) => lua.createTableFieldExpression(luaOf(one)))
    )
  }
  if (held !== null && typeof held === "object") return tableOf(Object.entries(held))
  return lua.createNilLiteral()
}

function tableOf(entries: readonly (readonly [string, unknown])[]): lua.TableExpression {
  return lua.createTableExpression(
    entries
      .filter(([, one]) => kept(one))
      .map(([key, one]) => lua.createTableFieldExpression(luaOf(one), lua.createStringLiteral(key)))
  )
}

function calledHere(node: ts.CallExpression): boolean {
  return ts.isIdentifier(node.expression) && node.expression.text === CALLED
}

function slugOf(node: ts.CallExpression, checker: ts.TypeChecker): string {
  const [given] = node.arguments
  const held = given === undefined ? undefined : checker.getTypeAtLocation(given).getProperty(SLUG)
  const type =
    given === undefined || held === undefined
      ? undefined
      : checker.getTypeOfSymbolAtLocation(held, given)
  if (type?.isStringLiteral() !== true) {
    throw new Error(
      `\`${CALLED}\` at ${node.getSourceFile().fileName} is handed no page whose slug is known as it compiles`
    )
  }
  return type.value
}

function keysOf(node: ts.CallExpression, checker: ts.TypeChecker): ReadonlySet<string> | null {
  const [named] = node.typeArguments ?? []
  if (named === undefined) return null
  const found = checker.getPropertiesOfType(checker.getTypeFromTypeNode(named))
  return found.length === 0 ? null : new Set(found.map((one) => one.name))
}

export function pagesTableFor(
  node: ts.CallExpression,
  checker: ts.TypeChecker,
  root: string,
  pagesOf: PagesOf
): lua.TableExpression | null {
  if (!calledHere(node)) return null
  const keys = keysOf(node, checker)
  const pages = [...pagesOf(root, slugOf(node, checker))].sort((one, other) =>
    one.path.localeCompare(other.path)
  )
  return lua.createTableExpression(
    pages.map((page) => {
      const entries = Object.entries(page.value).filter(([key]) => keys === null || keys.has(key))
      return lua.createTableFieldExpression(tableOf(entries))
    }),
    node
  )
}

function rootOf(context: TransformationContext): string {
  const root = context.program.getCompilerOptions().rootDir
  if (root === undefined) {
    throw new Error(
      `\`${CALLED}\` reads the index at the compile's root directory, and none is stated`
    )
  }
  return root
}

export function pagesOfTypePlugin(pagesOf: PagesOf = valuesOfType): Plugin {
  return {
    visitors: {
      [ts.SyntaxKind.CallExpression]: (node, context) =>
        (calledHere(node)
          ? pagesTableFor(node, context.checker, rootOf(context), pagesOf)
          : null) ?? context.superTransformExpression(node),
    },
  }
}

export default pagesOfTypePlugin()
