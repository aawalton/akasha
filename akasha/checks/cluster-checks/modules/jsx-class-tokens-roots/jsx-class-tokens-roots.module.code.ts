import ts from "typescript"

export function collectRootElements(
  sf: ts.SourceFile
): ReadonlySet<ts.JsxElement | ts.JsxSelfClosingElement> {
  const roots = new Set<ts.JsxElement | ts.JsxSelfClosingElement>()
  for (const stmt of sf.statements) {
    visitTopLevel(stmt, roots)
  }
  return roots
}

export function collectEnclosingComponents(
  sf: ts.SourceFile
): ReadonlyMap<ts.JsxElement | ts.JsxSelfClosingElement, string> {
  const map = new Map<ts.JsxElement | ts.JsxSelfClosingElement, string>()
  for (const stmt of sf.statements) {
    const named = pickComponentNameAndBody(stmt)
    if (named === null) continue
    tagJsxDescendants(named.body, named.name, map)
  }
  return map
}

export function collectTopLevelComponentNames(sf: ts.SourceFile): ReadonlySet<string> {
  const names = new Set<string>()
  for (const stmt of sf.statements) {
    const named = pickComponentNameAndBody(stmt)
    if (named !== null) names.add(named.name)
  }
  return names
}

interface NamedComponentBody {
  readonly name: string
  readonly body: ts.Node
}

function pickComponentNameAndBody(stmt: ts.Statement): NamedComponentBody | null {
  if (ts.isFunctionDeclaration(stmt) && stmt.name && isComponentName(stmt.name.text)) {
    if (stmt.body === undefined) return null
    return { name: stmt.name.text, body: stmt.body }
  }
  if (ts.isVariableStatement(stmt)) {
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue
      if (!isComponentName(decl.name.text)) continue
      const init = decl.initializer
      if (init === undefined) continue
      if (ts.isArrowFunction(init) || ts.isFunctionExpression(init)) {
        return { name: decl.name.text, body: init.body }
      }
    }
    return null
  }
  return null
}

function tagJsxDescendants(
  node: ts.Node,
  name: string,
  out: Map<ts.JsxElement | ts.JsxSelfClosingElement, string>
): undefined {
  if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) out.set(node, name)
  ts.forEachChild(node, (child) => tagJsxDescendants(child, name, out))
}

function visitTopLevel(
  stmt: ts.Statement,
  roots: Set<ts.JsxElement | ts.JsxSelfClosingElement>
): undefined {
  if (ts.isFunctionDeclaration(stmt) && stmt.name && isComponentName(stmt.name.text)) {
    captureRootFromBody(stmt.body, roots)
    return
  }
  if (ts.isVariableStatement(stmt)) {
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue
      if (!isComponentName(decl.name.text)) continue
      const init = decl.initializer
      if (init === undefined) continue
      if (ts.isArrowFunction(init) || ts.isFunctionExpression(init)) {
        captureRootFromArrowOrFn(init, roots)
      }
    }
    return
  }
  if (ts.isExportAssignment(stmt)) {
    const expr = stmt.expression
    if (ts.isArrowFunction(expr) || ts.isFunctionExpression(expr)) {
      captureRootFromArrowOrFn(expr, roots)
    }
  }
}

function isComponentName(name: string): boolean {
  if (name.length === 0) return false
  const c = name.charCodeAt(0)
  return c >= 65 && c <= 90
}

function captureRootFromArrowOrFn(
  fn: ts.ArrowFunction | ts.FunctionExpression,
  roots: Set<ts.JsxElement | ts.JsxSelfClosingElement>
): undefined {
  const body = fn.body
  if (ts.isBlock(body)) {
    captureRootFromBody(body, roots)
    return
  }
  const root = pickRootFromExpression(body)
  if (root !== null) roots.add(root)
}

function captureRootFromBody(
  body: ts.Block | undefined,
  roots: Set<ts.JsxElement | ts.JsxSelfClosingElement>
): undefined {
  if (body === undefined) return
  for (const stmt of body.statements) {
    if (ts.isReturnStatement(stmt) && stmt.expression !== undefined) {
      const root = pickRootFromExpression(stmt.expression)
      if (root !== null) roots.add(root)
      return
    }
  }
}

function pickRootFromExpression(
  expr: ts.Expression
): ts.JsxElement | ts.JsxSelfClosingElement | null {
  if (ts.isParenthesizedExpression(expr)) return pickRootFromExpression(expr.expression)
  if (ts.isJsxSelfClosingElement(expr)) return expr
  if (ts.isJsxElement(expr)) {
    if (isFragmentLike(expr)) return pickFragmentRoot(expr.children)
    return expr
  }
  if (ts.isJsxFragment(expr)) return pickFragmentRoot(expr.children)
  return null
}

function isFragmentLike(element: ts.JsxElement): boolean {
  const tag = element.openingElement.tagName
  if (ts.isIdentifier(tag) && tag.text === "Fragment") return true
  if (
    ts.isPropertyAccessExpression(tag) &&
    ts.isIdentifier(tag.name) &&
    tag.name.text === "Fragment"
  )
    return true
  return false
}

function pickFragmentRoot(
  children: ts.NodeArray<ts.JsxChild>
): ts.JsxElement | ts.JsxSelfClosingElement | null {
  const meaningful: ts.JsxChild[] = []
  for (const child of children) {
    if (ts.isJsxText(child)) {
      if (child.text.trim().length > 0) meaningful.push(child)
      continue
    }
    if (ts.isJsxExpression(child) && child.expression === undefined) continue
    meaningful.push(child)
  }
  if (meaningful.length !== 1) return null
  const only = meaningful[0]
  if (only === undefined) return null
  if (ts.isJsxElement(only)) {
    if (isFragmentLike(only)) return pickFragmentRoot(only.children)
    return only
  }
  if (ts.isJsxSelfClosingElement(only)) return only
  if (ts.isJsxFragment(only)) return pickFragmentRoot(only.children)
  return null
}
