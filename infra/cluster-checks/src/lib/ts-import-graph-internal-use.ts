import { readFileSync } from "node:fs"
import ts from "typescript"
import { hasExportModifier } from "./ts-import-graph-ast-helpers"

const internalUseCache = new Map<string, Map<string, Set<string | null>>>()

export function clearInternalUseCache(): undefined {
  internalUseCache.clear()
}

function buildInternalUseMap(
  sourceFile: ts.SourceFile,
  exportNames: Set<string>
): Map<string, Set<string | null>> {
  const declRanges = new Map<string, Array<{ start: number; end: number }>>()
  const stmtRanges: Array<{ name: string | null; start: number; end: number; exported: boolean }> =
    []
  for (const stmt of sourceFile.statements) {
    const exported = hasExportModifier(stmt)
    if (
      ts.isFunctionDeclaration(stmt) ||
      ts.isClassDeclaration(stmt) ||
      ts.isInterfaceDeclaration(stmt) ||
      ts.isTypeAliasDeclaration(stmt) ||
      ts.isEnumDeclaration(stmt) ||
      ts.isModuleDeclaration(stmt)
    ) {
      const nameText = stmt.name && ts.isIdentifier(stmt.name) ? stmt.name.text : null
      stmtRanges.push({
        name: nameText,
        start: stmt.getStart(sourceFile),
        end: stmt.getEnd(),
        exported,
      })
      if (exported && nameText != null && exportNames.has(nameText)) {
        const ranges = declRanges.get(nameText) ?? []
        ranges.push({ start: stmt.getStart(sourceFile), end: stmt.getEnd() })
        declRanges.set(nameText, ranges)
      }
      continue
    }
    if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) {
          stmtRanges.push({
            name: decl.name.text,
            start: stmt.getStart(sourceFile),
            end: stmt.getEnd(),
            exported,
          })
          if (exported && exportNames.has(decl.name.text)) {
            const ranges = declRanges.get(decl.name.text) ?? []
            ranges.push({ start: stmt.getStart(sourceFile), end: stmt.getEnd() })
            declRanges.set(decl.name.text, ranges)
          }
        }
      }
      continue
    }
    stmtRanges.push({ name: null, start: stmt.getStart(sourceFile), end: stmt.getEnd(), exported })
  }

  const useMap = new Map<string, Set<string | null>>()
  function findEnclosingStmt(pos: number): { name: string | null } | undefined {
    for (const sr of stmtRanges) {
      if (pos >= sr.start && pos < sr.end) return sr
    }
    return undefined
  }

  function visit(node: ts.Node): undefined {
    if (ts.isIdentifier(node) && exportNames.has(node.text)) {
      const parent = node.parent
      if (parent && ts.isPropertyAccessExpression(parent) && parent.name === node) {
        ts.forEachChild(node, visit)
        return
      }
      if (parent && ts.isPropertyAssignment(parent) && parent.name === node) {
        ts.forEachChild(node, visit)
        return
      }
      if (parent && (ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent))) {
        ts.forEachChild(node, visit)
        return
      }

      const pos = node.getStart(sourceFile)
      const ranges = declRanges.get(node.text)
      if (ranges) {
        const insideDecl = ranges.some((r) => pos >= r.start && pos < r.end)
        if (insideDecl) {
          ts.forEachChild(node, visit)
          return
        }
      }
      const enclosing = findEnclosingStmt(pos)
      let callers = useMap.get(node.text)
      if (!callers) {
        callers = new Set()
        useMap.set(node.text, callers)
      }
      callers.add(enclosing?.name ?? null)
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(sourceFile, visit)
  return useMap
}

export function hasInternalUse(
  filePath: string,
  exportName: string,
  exportNames: Set<string>,
  liveExportNames: Set<string>,
  allExportNames: Set<string>
): boolean {
  let useMap = internalUseCache.get(filePath)
  if (!useMap) {
    let text: string
    try {
      text = readFileSync(filePath, "utf-8")
    } catch {
      return false
    }
    const sf = ts.createSourceFile(filePath, text, ts.ScriptTarget.ESNext, true)
    useMap = buildInternalUseMap(sf, exportNames)
    internalUseCache.set(filePath, useMap)
  }
  const callers = useMap.get(exportName)
  if (!callers || callers.size === 0) return false
  for (const callerName of callers) {
    if (callerName === null) return true
    if (!allExportNames.has(callerName)) return true
    if (liveExportNames.has(callerName)) return true
  }
  return false
}
