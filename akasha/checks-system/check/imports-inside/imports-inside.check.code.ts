import { join } from "node:path"
import ts from "typescript"
import type { Body } from "../../checking.module.code.ts"
import { bodyOf, overEachFile } from "../../checking.module.code.ts"
import type { Judged, Leaving } from "../../judging.module.code.ts"

const TS = ".ts"

const AKASHA = "akasha"

const INSIDE = `${AKASHA}/`

const RELATIVE = /^\.\.?\//

export function specifiersIn(at: string, text: string): readonly string[] {
  const source = ts.createSourceFile(at, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const found: string[] = []
  const held = (node: ts.Node): void => {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier !== undefined &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      found.push(node.moduleSpecifier.text)
    }
    if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === "require"))
    ) {
      const one = node.arguments[0]
      if (one !== undefined && ts.isStringLiteral(one)) found.push(one.text)
    }
    if (ts.isExternalModuleReference(node) && ts.isStringLiteral(node.expression)) {
      found.push(node.expression.text)
    }
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
      const one = node.argument.literal
      if (ts.isStringLiteral(one)) found.push(one.text)
    }
    ts.forEachChild(node, held)
  }
  ts.forEachChild(source, held)
  return found
}

export function landingOf(at: string, specifier: string): string | null {
  if (specifier.startsWith("/")) return specifier
  if (!RELATIVE.test(specifier)) return null
  return join(at.slice(0, at.lastIndexOf("/")), specifier)
}

function inside(landed: string): boolean {
  return landed === AKASHA || landed.startsWith(INSIDE)
}

export function reasonsIn(given: Body): readonly string[] {
  if (!given.path.endsWith(TS)) return []
  if (!given.path.startsWith(INSIDE)) return []
  const text = bodyOf(given)
  if (text === null) return []
  const said: string[] = []
  for (const one of specifiersIn(given.path, text)) {
    const landed = landingOf(given.path, one)
    if (landed === null || inside(landed)) continue
    said.push(
      `\`${one}\` reaches \`${landed}\` — an akasha file imports no file outside the akasha folder`
    )
  }
  return said
}

export function importsInside(leaving: Leaving): readonly Judged[] {
  return overEachFile(leaving, reasonsIn)
}
