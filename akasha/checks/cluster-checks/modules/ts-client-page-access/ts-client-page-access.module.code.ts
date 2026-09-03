import ts from "typescript"

export type ClientPageAccessKind =
  | "pages-access-import"
  | "raw-from-pages"
  | "raw-pages-subscription"

export interface ClientPageAccessFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly kind: ClientPageAccessKind
  readonly callee: string
  readonly snippet: string
}

const PAGES_ACCESS_MODULE = "@akasha/pages-access"
const PAGES_UI_MODULE = "@shared/pages-ui"
const USE_OPTIMISTIC_RE = /^useOptimistic/
const REALTIME_EVENT = "postgres_changes"
const PAGES_TABLE = "pages"
const SUBSCRIPTION_CALLEE = `on('${REALTIME_EVENT}', { table: '${PAGES_TABLE}' })`

function lineCol(sf: ts.SourceFile, pos: number): { line: number; column: number } {
  const { line, character } = ts.getLineAndCharacterOfPosition(sf, pos)
  return { line: line + 1, column: character + 1 }
}

function isUseClientModule(sf: ts.SourceFile): boolean {
  for (const stmt of sf.statements) {
    if (!ts.isExpressionStatement(stmt) || !ts.isStringLiteral(stmt.expression)) break
    if (stmt.expression.text === "use client") return true
  }
  return false
}

function moduleMatches(spec: string, base: string): boolean {
  return spec === base || spec.startsWith(`${base}/`)
}

function collectValueImports(sf: ts.SourceFile, base: string): ReadonlySet<string> {
  const out = new Set<string>()
  for (const stmt of sf.statements) {
    if (!ts.isImportDeclaration(stmt) || !ts.isStringLiteral(stmt.moduleSpecifier)) continue
    if (!moduleMatches(stmt.moduleSpecifier.text, base)) continue
    const clause = stmt.importClause
    if (clause === undefined || clause.isTypeOnly) continue
    const named = clause.namedBindings
    if (named === undefined || !ts.isNamedImports(named)) continue
    for (const el of named.elements) {
      if (!el.isTypeOnly) out.add(el.name.text)
    }
  }
  return out
}

function collectNamespaceImports(sf: ts.SourceFile, base: string): ReadonlySet<string> {
  const out = new Set<string>()
  for (const stmt of sf.statements) {
    if (!ts.isImportDeclaration(stmt) || !ts.isStringLiteral(stmt.moduleSpecifier)) continue
    if (!moduleMatches(stmt.moduleSpecifier.text, base)) continue
    const clause = stmt.importClause
    if (clause === undefined || clause.isTypeOnly) continue
    const named = clause.namedBindings
    if (named === undefined || !ts.isNamespaceImport(named)) continue
    out.add(named.name.text)
  }
  return out
}

function calleeName(call: ts.CallExpression): string | undefined {
  const expr = call.expression
  if (ts.isIdentifier(expr)) return expr.text
  if (ts.isPropertyAccessExpression(expr)) return expr.name.text
  return undefined
}

function isRawFromPages(call: ts.CallExpression): boolean {
  const expr = call.expression
  if (!ts.isPropertyAccessExpression(expr) || expr.name.text !== "from") return false
  const arg0 = call.arguments[0]
  return arg0 !== undefined && ts.isStringLiteralLike(arg0) && arg0.text === "pages"
}

function namespaceCallee(
  call: ts.CallExpression,
  namespaces: ReadonlySet<string>
): string | undefined {
  const expr = call.expression
  if (!ts.isPropertyAccessExpression(expr)) return undefined
  if (!ts.isIdentifier(expr.expression)) return undefined
  if (!namespaces.has(expr.expression.text)) return undefined
  return `${expr.expression.text}.${expr.name.text}`
}

function propertyKey(prop: ts.ObjectLiteralElementLike): string | undefined {
  const name = prop.name
  if (name === undefined) return undefined
  if (ts.isIdentifier(name)) return name.text
  if (ts.isStringLiteralLike(name)) return name.text
  return undefined
}

function isRawPagesSubscription(call: ts.CallExpression): boolean {
  const expr = call.expression
  if (!ts.isPropertyAccessExpression(expr) || expr.name.text !== "on") return false
  const event = call.arguments[0]
  if (event === undefined || !ts.isStringLiteralLike(event) || event.text !== REALTIME_EVENT) {
    return false
  }
  const filter = call.arguments[1]
  if (filter === undefined || !ts.isObjectLiteralExpression(filter)) return false
  return filter.properties.some(
    (prop) =>
      ts.isPropertyAssignment(prop) &&
      propertyKey(prop) === "table" &&
      ts.isStringLiteralLike(prop.initializer) &&
      prop.initializer.text === PAGES_TABLE
  )
}

export function scanClientPageAccess(sf: ts.SourceFile): readonly ClientPageAccessFinding[] {
  if (!isUseClientModule(sf)) return []

  const pagesAccessNames = collectValueImports(sf, PAGES_ACCESS_MODULE)
  const pagesAccessNamespaces = collectNamespaceImports(sf, PAGES_ACCESS_MODULE)
  const pagesUiNames = collectValueImports(sf, PAGES_UI_MODULE)
  const out: ClientPageAccessFinding[] = []

  function pushFinding(
    call: ts.CallExpression,
    kind: ClientPageAccessKind,
    callee: string
  ): undefined {
    const { line, column } = lineCol(sf, call.getStart(sf))
    out.push({
      file: sf.fileName,
      line,
      column,
      kind,
      callee,
      snippet: call.getText(sf).slice(0, 120),
    })
  }

  function isWrapperCall(call: ts.CallExpression): boolean {
    const name = calleeName(call)
    if (name === undefined) return false
    return USE_OPTIMISTIC_RE.test(name) || pagesUiNames.has(name)
  }

  function visit(node: ts.Node, insideWrapper: boolean): undefined {
    if (ts.isCallExpression(node)) {
      const wrapper = isWrapperCall(node)
      if (isRawPagesSubscription(node)) {
        pushFinding(node, "raw-pages-subscription", SUBSCRIPTION_CALLEE)
      } else if (!wrapper && !insideWrapper) {
        const name = calleeName(node)
        const namespaced = namespaceCallee(node, pagesAccessNamespaces)
        if (name !== undefined && ts.isIdentifier(node.expression) && pagesAccessNames.has(name)) {
          pushFinding(node, "pages-access-import", name)
        } else if (namespaced !== undefined) {
          pushFinding(node, "pages-access-import", namespaced)
        } else if (isRawFromPages(node)) {
          pushFinding(node, "raw-from-pages", "from('pages')")
        }
      }
      const childInside = insideWrapper || wrapper
      ts.forEachChild(node, (child) => visit(child, childInside))
      return
    }
    ts.forEachChild(node, (child) => visit(child, insideWrapper))
    return
  }

  ts.forEachChild(sf, (child) => visit(child, false))
  return out
}
