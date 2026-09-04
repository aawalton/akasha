import * as ts from "typescript"

const NAMESPACE_REACH = "*"

export interface ReachabilityResult {
  readonly reachableFiles: ReadonlySet<ts.SourceFile>
  readonly reachableNames: ReadonlyMap<ts.SourceFile, ReadonlySet<string>>
}

export function isNameReached(
  result: ReachabilityResult,
  sourceFile: ts.SourceFile,
  name: string
): boolean {
  const set = result.reachableNames.get(sourceFile)
  if (!set) return false
  return set.has(NAMESPACE_REACH) || set.has(name)
}

export function isFullyReached(result: ReachabilityResult, sourceFile: ts.SourceFile): boolean {
  return result.reachableNames.get(sourceFile)?.has(NAMESPACE_REACH) ?? false
}

type NamespaceRefKind =
  | { kind: "ignore" }
  | { kind: "name"; name: string }
  | { kind: "names"; names: readonly string[] }
  | { kind: "escape" }

function isNamespaceUseInTypePosition(ref: ts.Identifier): boolean {
  if (ts.isTypeQueryNode(ref.parent)) return true

  let current: ts.Node = ref
  while (ts.isQualifiedName(current.parent)) {
    current = current.parent
  }
  return ts.isTypeNode(current.parent)
}

function classifyNamespaceRef(ref: ts.Identifier): NamespaceRefKind {
  const parent = ref.parent

  if (ts.isNamespaceImport(parent) && parent.name === ref) {
    return { kind: "ignore" }
  }

  if (isNamespaceUseInTypePosition(ref)) {
    return { kind: "ignore" }
  }

  if (ts.isPropertyAccessExpression(parent) && parent.expression === ref) {
    return { kind: "name", name: parent.name.text }
  }

  if (ts.isElementAccessExpression(parent) && parent.expression === ref) {
    if (ts.isStringLiteralLike(parent.argumentExpression)) {
      return { kind: "name", name: parent.argumentExpression.text }
    }
    return { kind: "escape" }
  }

  if (
    ts.isVariableDeclaration(parent) &&
    parent.initializer === ref &&
    ts.isObjectBindingPattern(parent.name)
  ) {
    const names: string[] = []
    for (const el of parent.name.elements) {
      if (el.dotDotDotToken) return { kind: "escape" }
      const propName = el.propertyName
      if (propName) {
        if (ts.isIdentifier(propName)) {
          names.push(propName.text)
        } else if (ts.isStringLiteral(propName)) {
          names.push(propName.text)
        } else if (ts.isNumericLiteral(propName)) {
          names.push(propName.text)
        } else {
          return { kind: "escape" }
        }
      } else {
        if (ts.isIdentifier(el.name)) {
          names.push(el.name.text)
        } else {
          return { kind: "escape" }
        }
      }
    }
    return { kind: "names", names }
  }

  if (ts.isExportSpecifier(parent)) {
    return { kind: "escape" }
  }
  if (ts.isExportAssignment(parent) && parent.expression === ref) {
    return { kind: "escape" }
  }

  return { kind: "escape" }
}

function symbolMatchesNamespaceBinding(
  sym: ts.Symbol,
  target: ts.Symbol,
  checker: ts.TypeChecker
): boolean {
  if (sym === target) return true
  if ((sym.flags & ts.SymbolFlags.Alias) === 0) return false
  const aliased = checker.getImmediateAliasedSymbol(sym)
  return aliased === target
}

function collectNamespaceAccess(
  sf: ts.SourceFile,
  nsBindingSymbol: ts.Symbol,
  checker: ts.TypeChecker
): { escape: true } | { escape: false; names: ReadonlySet<string> } {
  const names = new Set<string>()
  let escaped = false

  const visit = (node: ts.Node): undefined => {
    if (escaped) return
    if (ts.isIdentifier(node)) {
      const sym = checker.getSymbolAtLocation(node)
      if (sym && symbolMatchesNamespaceBinding(sym, nsBindingSymbol, checker)) {
        const kind = classifyNamespaceRef(node)
        switch (kind.kind) {
          case "ignore":
            break
          case "name":
            names.add(kind.name)
            break
          case "names":
            for (const n of kind.names) names.add(n)
            break
          case "escape":
            escaped = true
            return
        }
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(sf)

  if (escaped) return { escape: true }
  return { escape: false, names }
}

export function computeReachability(program: ts.Program, entry: ts.SourceFile): ReachabilityResult {
  const checker = program.getTypeChecker()
  const reachableFiles = new Set<ts.SourceFile>()
  const reachableNames = new Map<ts.SourceFile, Set<string>>()
  const dirty = new Set<ts.SourceFile>()

  const ensureNames = (sf: ts.SourceFile): Set<string> => {
    let s = reachableNames.get(sf)
    if (!s) {
      s = new Set()
      reachableNames.set(sf, s)
    }
    return s
  }

  const markFile = (sf: ts.SourceFile): undefined => {
    if (!reachableFiles.has(sf)) {
      reachableFiles.add(sf)
      dirty.add(sf)
    }
    return undefined
  }

  const markName = (sf: ts.SourceFile, name: string): boolean => {
    const s = ensureNames(sf)
    if (s.has(NAMESPACE_REACH)) return false
    if (name === NAMESPACE_REACH) {
      s.clear()
      s.add(NAMESPACE_REACH)
      dirty.add(sf)
      return true
    }
    if (s.has(name)) return false
    s.add(name)
    dirty.add(sf)
    return true
  }

  const resolveTargetSourceFile = (specifier: ts.Expression): ts.SourceFile | undefined => {
    const sym = checker.getSymbolAtLocation(specifier)
    if (!sym?.declarations) return undefined
    for (const decl of sym.declarations) {
      if (ts.isSourceFile(decl)) return decl
    }
    return undefined
  }

  const exportsOf = (sf: ts.SourceFile): readonly ts.Symbol[] => {
    const sym = checker.getSymbolAtLocation(sf)
    if (!sym) return []
    return checker.getExportsOfModule(sym)
  }

  markFile(entry)
  markName(entry, NAMESPACE_REACH)

  while (dirty.size > 0) {
    const iter = dirty.values().next()
    if (iter.done) break
    const sf = iter.value
    dirty.delete(sf)

    const localNames = ensureNames(sf)
    const allReachedHere = localNames.has(NAMESPACE_REACH)

    for (const stmt of sf.statements) {
      if (ts.isImportDeclaration(stmt)) {
        const target = resolveTargetSourceFile(stmt.moduleSpecifier)
        if (!target) continue

        const clause = stmt.importClause
        if (!clause) {
          markFile(target)
          continue
        }
        if (clause.isTypeOnly) continue

        markFile(target)

        if (clause.name) {
          markName(target, "default")
        }
        if (clause.namedBindings) {
          if (ts.isNamespaceImport(clause.namedBindings)) {
            const nsBinding = checker.getSymbolAtLocation(clause.namedBindings.name)
            const result = nsBinding
              ? collectNamespaceAccess(sf, nsBinding, checker)
              : ({ escape: true } as const)
            if (result.escape) {
              markName(target, NAMESPACE_REACH)
            } else {
              for (const name of result.names) markName(target, name)
            }
          } else if (ts.isNamedImports(clause.namedBindings)) {
            for (const spec of clause.namedBindings.elements) {
              if (spec.isTypeOnly) continue
              const name = (spec.propertyName ?? spec.name).text
              markName(target, name)
            }
          }
        }
      } else if (ts.isExportDeclaration(stmt)) {
        if (stmt.isTypeOnly) continue
        if (!stmt.moduleSpecifier) continue
        const target = resolveTargetSourceFile(stmt.moduleSpecifier)
        if (!target) continue

        if (!stmt.exportClause) {
          if (allReachedHere) {
            markFile(target)
            markName(target, NAMESPACE_REACH)
            continue
          }
          let propagatedAny = false
          for (const exp of exportsOf(target)) {
            if (localNames.has(exp.name)) {
              propagatedAny = true
              markName(target, exp.name)
            }
          }
          if (propagatedAny) markFile(target)
        } else if (ts.isNamespaceExport(stmt.exportClause)) {
          const localName = stmt.exportClause.name.text
          if (allReachedHere || localNames.has(localName)) {
            markFile(target)
            markName(target, NAMESPACE_REACH)
          }
        } else {
          for (const spec of stmt.exportClause.elements) {
            if (spec.isTypeOnly) continue
            const localName = spec.name.text
            const sourceName = (spec.propertyName ?? spec.name).text
            if (allReachedHere || localNames.has(localName)) {
              markFile(target)
              markName(target, sourceName)
            }
          }
        }
      }
    }
  }

  return { reachableFiles, reachableNames }
}
