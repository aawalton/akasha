import ts from "typescript"

interface ParsedAddonSource {
  readonly path: string
  readonly sf: ts.SourceFile
}

function parseAddonSource(path: string, source: string): ParsedAddonSource {
  return { path, sf: ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true) }
}

const GLOBAL_TABLE_IDENTIFIERS: ReadonlySet<string> = new Set(["globalThis", "_G"])

function unwrap(node: ts.Expression): ts.Expression {
  let current: ts.Expression = node
  for (;;) {
    if (
      ts.isParenthesizedExpression(current) ||
      ts.isAsExpression(current) ||
      ts.isSatisfiesExpression(current) ||
      ts.isNonNullExpression(current) ||
      ts.isTypeAssertionExpression(current)
    ) {
      current = current.expression
      continue
    }
    return current
  }
}

function isGlobalTable(node: ts.Expression, bound: ReadonlySet<string>): boolean {
  const expr = unwrap(node)
  if (ts.isIdentifier(expr)) {
    return GLOBAL_TABLE_IDENTIFIERS.has(expr.text) || bound.has(expr.text)
  }
  if (ts.isCallExpression(expr) && expr.arguments.length === 1) {
    const arg = expr.arguments[0]
    return arg !== undefined && isGlobalTable(arg, bound)
  }
  return false
}

function boundGlobalTableNames(sf: ts.SourceFile): ReadonlySet<string> {
  const declarations = new Map<string, ts.Expression[]>()
  const collect = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      const initializers = declarations.get(node.name.text) ?? []
      initializers.push(node.initializer)
      declarations.set(node.name.text, initializers)
    }
    ts.forEachChild(node, collect)
  }
  collect(sf)

  const bound = new Set<string>()
  for (;;) {
    let grew = false
    for (const [name, initializers] of declarations) {
      if (bound.has(name)) continue
      if (initializers.every((init) => isGlobalTable(init, bound))) {
        bound.add(name)
        grew = true
      }
    }
    if (!grew) return bound
  }
}

function collectGlobalWritesFromSourceFile(sf: ts.SourceFile): readonly string[] {
  const bound = boundGlobalTableNames(sf)
  const names = new Set<string>()

  const visit = (node: ts.Node): undefined => {
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      const lhs = unwrap(node.left)
      if (ts.isPropertyAccessExpression(lhs) && isGlobalTable(lhs.expression, bound)) {
        names.add(lhs.name.text)
      } else if (
        ts.isElementAccessExpression(lhs) &&
        isGlobalTable(lhs.expression, bound) &&
        ts.isStringLiteralLike(lhs.argumentExpression)
      ) {
        names.add(lhs.argumentExpression.text)
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)

  return [...names].sort()
}

export function collectGlobalWritesFromSource(source: string, filePath: string): readonly string[] {
  return collectGlobalWritesFromSourceFile(parseAddonSource(filePath, source).sf)
}
