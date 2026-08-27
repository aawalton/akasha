import ts from "typescript"
import type { ExportKind } from "./ts-import-graph-types"

export function exportKindFromNode(node: ts.Node): ExportKind {
  if (ts.isFunctionDeclaration(node)) return "function"
  if (ts.isClassDeclaration(node)) return "class"
  if (ts.isInterfaceDeclaration(node)) return "interface"
  if (ts.isTypeAliasDeclaration(node)) return "type"
  if (ts.isEnumDeclaration(node)) return "enum"
  if (ts.isModuleDeclaration(node)) return "namespace"
  if (ts.isVariableStatement(node)) {
    const flags = node.declarationList.flags
    if ((flags & ts.NodeFlags.Const) !== 0) return "const"
    if ((flags & ts.NodeFlags.Let) !== 0) return "let"
    return "var"
  }
  return "const"
}

export function hasExportModifier(node: ts.Node): boolean {
  const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined
  return modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) ?? false
}

export function hasDefaultModifier(node: ts.Node): boolean {
  const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined
  return modifiers?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword) ?? false
}

export function lineOf(sourceFile: ts.SourceFile, pos: number): number {
  return sourceFile.getLineAndCharacterOfPosition(pos).line + 1
}

export function collectTypeRefs(node: ts.Node | undefined): readonly string[] {
  if (!node) return []
  const refs = new Set<string>()
  function visit(n: ts.Node): undefined {
    if (ts.isTypeReferenceNode(n) && ts.isIdentifier(n.typeName)) {
      refs.add(n.typeName.text)
    }
    ts.forEachChild(n, visit)
  }
  visit(node)
  return [...refs]
}

export function collectSignatureTypeRefs(stmt: ts.Statement): readonly string[] | undefined {
  const refs = new Set<string>()
  function addRefs(node: ts.Node | undefined): undefined {
    for (const r of collectTypeRefs(node)) refs.add(r)
  }

  if (ts.isFunctionDeclaration(stmt)) {
    addRefs(stmt.type)
    for (const param of stmt.parameters) addRefs(param.type)
  } else if (ts.isVariableStatement(stmt)) {
    for (const decl of stmt.declarationList.declarations) {
      addRefs(decl.type)
      if (decl.initializer && ts.isArrowFunction(decl.initializer)) {
        addRefs(decl.initializer.type)
        for (const param of decl.initializer.parameters) addRefs(param.type)
      }
    }
  } else if (ts.isTypeAliasDeclaration(stmt)) {
    addRefs(stmt.type)
  } else if (ts.isInterfaceDeclaration(stmt)) {
    for (const member of stmt.members) {
      if (ts.isPropertySignature(member)) addRefs(member.type)
      if (ts.isMethodSignature(member)) {
        addRefs(member.type)
        for (const param of member.parameters) addRefs(param.type)
      }
    }
  } else if (ts.isClassDeclaration(stmt)) {
    for (const member of stmt.members) {
      if (ts.isPropertyDeclaration(member)) addRefs(member.type)
      if (ts.isMethodDeclaration(member)) {
        addRefs(member.type)
        for (const param of member.parameters) addRefs(param.type)
      }
    }
  } else {
    return undefined
  }

  return refs.size > 0 ? [...refs] : undefined
}
