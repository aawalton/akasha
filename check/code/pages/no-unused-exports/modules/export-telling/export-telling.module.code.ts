import {
  ANYTHING,
  DEFAULT,
} from "akasha/check/code/pages/no-unused-exports/modules/import-losing/import-losing.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

type Told = {
  readonly name: string
  readonly typed: boolean
}

function valued(name: string): Told {
  return { name, typed: false }
}

function typed(name: string): Told {
  return { name, typed: true }
}

function namesOf(statement: ts.Statement): readonly Told[] {
  if (ts.isVariableStatement(statement)) {
    return statement.declarationList.declarations.map((one) =>
      valued(ts.isIdentifier(one.name) ? one.name.text : ANYTHING)
    )
  }
  if (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) {
    return [valued(statement.name?.text ?? DEFAULT)]
  }
  if (ts.isTypeAliasDeclaration(statement) || ts.isInterfaceDeclaration(statement)) {
    return [typed(statement.name.text)]
  }
  return [valued(ANYTHING)]
}

function listedIn(statement: ts.ExportDeclaration): readonly Told[] {
  if (!statement.isTypeOnly || statement.moduleSpecifier !== undefined) return [valued(ANYTHING)]
  const clause = statement.exportClause
  if (clause === undefined || !ts.isNamedExports(clause)) return [valued(ANYTHING)]
  return clause.elements.map((one) => typed(one.name.text))
}

function toldIn(source: ts.SourceFile): readonly Told[] {
  const found: Told[] = []
  for (const statement of source.statements) {
    if (ts.isExportAssignment(statement)) {
      found.push(valued(DEFAULT))
      continue
    }
    if (ts.isExportDeclaration(statement)) {
      found.push(...listedIn(statement))
      continue
    }
    if (!ts.canHaveModifiers(statement)) continue
    const modifiers = ts.getModifiers(statement) ?? []
    if (!modifiers.some((one) => one.kind === ts.SyntaxKind.ExportKeyword)) continue
    if (modifiers.some((one) => one.kind === ts.SyntaxKind.DefaultKeyword)) {
      found.push(valued(DEFAULT))
      continue
    }
    found.push(...namesOf(statement))
  }
  return found
}

export function namesToldIn(path: string, text: string): readonly string[] | null {
  const found = toldIn(parsedAs(path, text)).map((one) => one.name)
  if (found.includes(ANYTHING)) return null
  return [...new Set(found)]
}

export function typesToldIn(path: string, text: string): ReadonlySet<string> {
  const found = toldIn(parsedAs(path, text))
  const values = new Set(found.filter((one) => !one.typed).map((one) => one.name))
  return new Set(found.filter((one) => one.typed && !values.has(one.name)).map((one) => one.name))
}

function typeNamed(node: ts.Identifier): boolean {
  const up = node.parent
  if (ts.isTypeReferenceNode(up)) return up.typeName === node
  return ts.isExpressionWithTypeArguments(up) && up.expression === node
}

export function typesNamedWithin(path: string, text: string): ReadonlySet<string> {
  const found = new Set<string>()
  const walk = (node: ts.Node): undefined => {
    if (ts.isIdentifier(node) && typeNamed(node)) found.add(node.text)
    ts.forEachChild(node, walk)
    return undefined
  }
  walk(parsedAs(path, text))
  return found
}
