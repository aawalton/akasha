import {
  ANYTHING,
  DEFAULT,
} from "akasha/check/code/pages/no-unused-exports/modules/import-losing/import-losing.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

function namesOf(statement: ts.Statement): readonly string[] {
  if (ts.isVariableStatement(statement)) {
    return statement.declarationList.declarations.map((one) =>
      ts.isIdentifier(one.name) ? one.name.text : ANYTHING
    )
  }
  if (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) {
    return [statement.name?.text ?? DEFAULT]
  }
  if (ts.isTypeAliasDeclaration(statement) || ts.isInterfaceDeclaration(statement)) {
    return [statement.name.text]
  }
  return [ANYTHING]
}

function listedIn(statement: ts.ExportDeclaration): readonly string[] {
  if (!statement.isTypeOnly || statement.moduleSpecifier !== undefined) return [ANYTHING]
  const clause = statement.exportClause
  if (clause === undefined || !ts.isNamedExports(clause)) return [ANYTHING]
  return clause.elements.map((one) => one.name.text)
}

function toldIn(source: ts.SourceFile): readonly string[] {
  const found: string[] = []
  for (const statement of source.statements) {
    if (ts.isExportAssignment(statement)) {
      found.push(DEFAULT)
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
      found.push(DEFAULT)
      continue
    }
    found.push(...namesOf(statement))
  }
  return found
}

export function namesToldIn(path: string, text: string): readonly string[] | null {
  const found = toldIn(parsedAs(path, text))
  if (found.includes(ANYTHING)) return null
  return [...new Set(found)]
}
