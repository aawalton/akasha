import ts from "typescript"

const LINE = "\n"

export type Carried = {
  readonly from: string
  readonly type: boolean
}

function spelt(one: ts.Identifier): boolean {
  const up = one.parent
  if (ts.isImportSpecifier(up) || ts.isImportClause(up) || ts.isNamespaceImport(up)) return true
  if (ts.isPropertyAccessExpression(up) && up.name === one) return true
  if (ts.isPropertyAssignment(up) && up.name === one) return true
  return ts.isPropertySignature(up) && up.name === one
}

export function namesIn(held: ts.Node): readonly string[] {
  const found: string[] = []
  const walked = (one: ts.Node): undefined => {
    if (ts.isTypeReferenceNode(one) && ts.isIdentifier(one.typeName)) found.push(one.typeName.text)
    if (ts.isIdentifier(one) && !spelt(one)) found.push(one.text)
    return ts.forEachChild(one, walked)
  }
  walked(held)
  return found
}

export function namedIn(one: ts.ImportDeclaration): ts.NamedImports | null {
  const bound = one.importClause?.namedBindings
  return bound !== undefined && ts.isNamedImports(bound) ? bound : null
}

export function namingOf(each: ts.ImportSpecifier): string {
  return (each.propertyName ?? each.name).text
}

export function importsIn(source: ts.SourceFile): ReadonlyMap<string, Carried> {
  const found = new Map<string, Carried>()
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const bound = namedIn(one)
    const named = one.moduleSpecifier
    if (bound === null || !ts.isStringLiteral(named)) continue
    const whole = one.importClause?.isTypeOnly === true
    for (const each of bound.elements) {
      found.set(each.name.text, { from: named.text, type: whole || each.isTypeOnly })
    }
  }
  return found
}

export function lineFor(name: string, spelled: string, type: boolean): string {
  return `import ${type ? "type " : ""}{ ${name} } from ${JSON.stringify(spelled)}`
}

export function withoutOne(
  text: string,
  one: ts.ImportDeclaration,
  bound: ts.NamedImports,
  gone: ts.ImportSpecifier
): string {
  const source = one.getSourceFile()
  const kept = bound.elements
    .filter((each) => each !== gone)
    .map((each) => text.slice(each.getStart(source), each.getEnd()))
  const head = text.slice(one.getStart(source), bound.getStart(source))
  const tail = text.slice(bound.getEnd(), one.getEnd())
  return `${head}{ ${kept.join(", ")} }${tail}`
}

export function anchorIn(text: string, source: ts.SourceFile): string | null {
  let found: string | null = null
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    found = text.slice(one.getStart(source), one.getEnd())
  }
  return found
}

export function openedIn(landed: string, source: ts.SourceFile, lines: readonly string[]): string {
  if (lines.length === 0) return landed
  const anchor = anchorIn(landed, source)
  if (anchor === null) return `${lines.join(LINE)}${LINE}${LINE}${landed}`
  return landed.replace(anchor, `${anchor}${LINE}${lines.join(LINE)}`)
}
