import ts from "typescript"

const REQUIRING = "createRequire"

const REQUIRE = "require"

const RESOLVE = "resolve"

type Taking = { readonly named: string; readonly places: readonly string[] }

function literal(node: ts.Node): node is ts.StringLiteralLike {
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)
}

function madeByRequire(node: ts.Node): string | null {
  if (!ts.isVariableDeclaration(node) || !ts.isIdentifier(node.name)) return null
  const held = node.initializer
  if (held === undefined || !ts.isCallExpression(held)) return null
  if (!ts.isIdentifier(held.expression) || held.expression.text !== REQUIRING) return null
  return node.name.text
}

function requiredFrom(source: ts.SourceFile): ReadonlySet<string> {
  const found = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    const named = madeByRequire(node)
    if (named !== null) found.add(named)
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return found
}

function placesOf(node: ts.SignatureDeclaration): readonly string[] {
  return node.parameters.map((one) => (ts.isIdentifier(one.name) ? one.name.text : ""))
}

function takingIn(node: ts.Node): Taking | null {
  if (ts.isFunctionDeclaration(node) && node.name !== undefined) {
    return { named: node.name.text, places: placesOf(node) }
  }
  if (!ts.isVariableDeclaration(node) || !ts.isIdentifier(node.name)) return null
  const held = node.initializer
  if (held === undefined || (!ts.isArrowFunction(held) && !ts.isFunctionExpression(held))) {
    return null
  }
  return { named: node.name.text, places: placesOf(held) }
}

function requiringIn(node: ts.Expression): string | null {
  if (ts.isIdentifier(node)) return node.text
  if (!ts.isPropertyAccessExpression(node)) return null
  if (node.name.text !== RESOLVE || !ts.isIdentifier(node.expression)) return null
  return node.expression.text
}

function requiredBy(node: ts.Node, requiring: ReadonlySet<string>): ts.Expression | null {
  if (!ts.isCallExpression(node)) return null
  if (node.expression.kind === ts.SyntaxKind.ImportKeyword) return node.arguments[0] ?? null
  const named = requiringIn(node.expression)
  if (named === null) return null
  if (named !== REQUIRE && !requiring.has(named)) return null
  return node.arguments[0] ?? null
}

function heldFrom(source: ts.SourceFile): ReadonlySet<ts.Node> {
  const requiring = requiredFrom(source)
  const held = new Set<ts.Node>()
  const carried = new Set<string>()
  const hops = new Map<string, Set<number>>()
  const taking = (arg: ts.Expression): undefined => {
    if (literal(arg)) held.add(arg)
    else if (ts.isIdentifier(arg)) carried.add(arg.text)
  }
  const asking = (node: ts.Node, within: Taking | null): undefined => {
    const own = takingIn(node) ?? within
    const arg = requiredBy(node, requiring)
    if (arg !== null) {
      const at = own === null || !ts.isIdentifier(arg) ? -1 : own.places.indexOf(arg.text)
      if (own === null || at < 0) taking(arg)
      else hops.set(own.named, (hops.get(own.named) ?? new Set<number>()).add(at))
    }
    ts.forEachChild(node, (one) => asking(one, own))
  }
  ts.forEachChild(source, (one) => asking(one, null))
  const calling = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      for (const at of hops.get(node.expression.text) ?? []) {
        const arg = node.arguments[at]
        if (arg !== undefined) taking(arg)
      }
    }
    ts.forEachChild(node, calling)
  }
  ts.forEachChild(source, calling)
  const writing = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      const one = node.initializer
      if (one !== undefined && literal(one) && carried.has(node.name.text)) held.add(one)
    }
    ts.forEachChild(node, writing)
  }
  ts.forEachChild(source, writing)
  return held
}

export function loadingIn(source: ts.SourceFile): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of heldFrom(source)) {
    if (literal(one)) found.add(one.text)
  }
  return found
}
