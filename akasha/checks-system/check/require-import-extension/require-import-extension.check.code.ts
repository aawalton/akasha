import ts from "typescript"
import type { Body } from "../../checking.module.code.ts"
import { bodyOf } from "../../checking.module.code.ts"

const TS = ".ts"

const RELATIVE = /^\.\.?\//

export function specifiersIn(path: string, text: string): readonly string[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
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
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
      const one = node.argument.literal
      if (ts.isStringLiteral(one)) found.push(one.text)
    }
    ts.forEachChild(node, held)
  }
  ts.forEachChild(source, held)
  return found
}

export function requireImportExtension(given: Body): readonly string[] {
  if (!given.path.endsWith(TS)) return []
  const text = bodyOf(given)
  if (text === null) return []
  const said: string[] = []
  for (const one of specifiersIn(given.path, text)) {
    if (!RELATIVE.test(one)) continue
    if (one.endsWith(TS)) continue
    said.push(`\`${one}\` is written without the \`.ts\` extension of the file it names`)
  }
  return said
}
