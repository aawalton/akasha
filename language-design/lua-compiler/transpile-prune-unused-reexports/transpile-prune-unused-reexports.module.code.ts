import * as ts from "typescript"
import {
  isFullyReached,
  type ReachabilityResult,
} from "../transpile-reachability/transpile-reachability.module.code.ts"

export function createPruneUnusedReexportsTransformer(
  program: ts.Program,
  reachability: ReachabilityResult
): ts.TransformerFactory<ts.SourceFile> {
  const checker = program.getTypeChecker()

  const resolveTargetSourceFile = (specifier: ts.Expression): ts.SourceFile | undefined => {
    const sym = checker.getSymbolAtLocation(specifier)
    if (!sym?.declarations) return undefined
    for (const decl of sym.declarations) {
      if (ts.isSourceFile(decl)) return decl
    }
    return undefined
  }

  return (context) => (sourceFile) => {
    if (sourceFile.isDeclarationFile) return sourceFile
    const localNames = reachability.reachableNames.get(sourceFile)
    if (!localNames) return sourceFile
    if (isFullyReached(reachability, sourceFile)) return sourceFile

    const factory = context.factory
    const newStatements: ts.Statement[] = []
    let mutated = false

    for (const stmt of sourceFile.statements) {
      if (!ts.isExportDeclaration(stmt) || !stmt.moduleSpecifier || stmt.isTypeOnly) {
        newStatements.push(stmt)
        continue
      }

      const target = resolveTargetSourceFile(stmt.moduleSpecifier)
      if (!target) {
        newStatements.push(stmt)
        continue
      }

      if (!stmt.exportClause) {
        const targetSym = checker.getSymbolAtLocation(target)
        const targetExports = targetSym ? checker.getExportsOfModule(targetSym) : []
        const anyReached = targetExports.some((exp) => localNames.has(exp.name))
        if (anyReached) {
          newStatements.push(stmt)
        } else {
          mutated = true
        }
      } else if (ts.isNamespaceExport(stmt.exportClause)) {
        if (localNames.has(stmt.exportClause.name.text)) {
          newStatements.push(stmt)
        } else {
          mutated = true
        }
      } else {
        const kept = stmt.exportClause.elements.filter((spec) => localNames.has(spec.name.text))
        if (kept.length === stmt.exportClause.elements.length) {
          newStatements.push(stmt)
        } else if (kept.length === 0) {
          mutated = true
        } else {
          mutated = true
          newStatements.push(
            factory.updateExportDeclaration(
              stmt,
              stmt.modifiers,
              stmt.isTypeOnly,
              factory.updateNamedExports(stmt.exportClause, kept),
              stmt.moduleSpecifier,
              stmt.attributes
            )
          )
        }
      }
    }

    if (!mutated) return sourceFile
    return factory.updateSourceFile(sourceFile, newStatements)
  }
}
