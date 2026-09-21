import { boundIn, thereIn } from "akasha/change/modules/name-binding/name-binding.module.code.ts"
import ts from "typescript"

const LINE = "\n"

function declares(one: ts.Statement): boolean {
  if (ts.isVariableStatement(one) || ts.isFunctionDeclaration(one)) return true
  if (ts.isClassDeclaration(one) || ts.isEnumDeclaration(one)) return true
  if (ts.isTypeAliasDeclaration(one) || ts.isInterfaceDeclaration(one)) return true
  return ts.isImportDeclaration(one) || ts.isExportDeclaration(one) || ts.isModuleDeclaration(one)
}

function runningAbove(source: ts.SourceFile, one: ts.Statement): ts.Statement | null {
  for (const each of source.statements) {
    if (each.getFullStart() >= one.getFullStart()) return null
    if (!declares(each)) return each
  }
  return null
}

function still(each: ts.Node): boolean {
  if (ts.isTypeNode(each) || ts.isFunctionLike(each) || ts.isClassLike(each)) return true
  if (ts.isImportDeclaration(each) || ts.isExportDeclaration(each)) return true
  if (ts.isTypeAliasDeclaration(each) || ts.isInterfaceDeclaration(each)) return true
  return ts.isModuleDeclaration(each) || ts.isEnumDeclaration(each)
}

function readIn(one: ts.Node): readonly string[] {
  const found: string[] = []
  const walked = (each: ts.Node): undefined => {
    if (still(each)) return undefined
    if (ts.isPropertyAccessExpression(each)) return walked(each.expression)
    if (ts.isPropertyAssignment(each)) {
      if (ts.isComputedPropertyName(each.name)) walked(each.name.expression)
      return walked(each.initializer)
    }
    if (ts.isIdentifier(each)) {
      found.push(each.text)
      return undefined
    }
    return ts.forEachChild(each, walked)
  }
  walked(one)
  return found
}

export function unboundIn(
  source: ts.SourceFile,
  one: ts.Statement,
  there: ReadonlySet<string> = thereIn(source)
): readonly string[] {
  const bound = boundIn(one)
  const found: string[] = []
  for (const name of readIn(one)) {
    if (there.has(name) || bound.has(name) || found.includes(name)) continue
    found.push(name)
  }
  return found
}

export type Ahead = {
  readonly name: string
  readonly above: string
}

export function aheadIn(source: ts.SourceFile, one: ts.Statement): Ahead | null {
  if (!ts.isVariableStatement(one)) return null
  const above = runningAbove(source, one)
  if (above === null) return null
  const name = unboundIn(source, one)[0]
  if (name === undefined) return null
  const said = above.getText(source)
  const at = said.indexOf(LINE)
  return { name, above: at === -1 ? said : said.slice(0, at) }
}
