import ts from "typescript"

const LINE = "\n"

const EVERY = "*"

export type Carried = {
  readonly from: string
  readonly type: boolean
}

export type Taken = {
  readonly old: string
  readonly new: string
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

export function namingsIn(source: ts.SourceFile): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const bound = namedIn(one)
    if (bound === null) continue
    for (const each of bound.elements) found.set(each.name.text, namingOf(each))
  }
  return found
}

function everyOf(one: ts.ImportDeclaration): string | null {
  const bound = one.importClause?.namedBindings
  return bound !== undefined && ts.isNamespaceImport(bound) ? bound.name.text : null
}

export function everyIn(source: ts.SourceFile): ReadonlyMap<string, Carried> {
  const found = new Map<string, Carried>()
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const name = everyOf(one)
    const named = one.moduleSpecifier
    if (name === null || !ts.isStringLiteral(named)) continue
    found.set(name, { from: named.text, type: one.importClause?.isTypeOnly === true })
  }
  return found
}

export function lineFor(name: string, spelled: string, type: boolean): string {
  return `import ${type ? "type " : ""}{ ${name} } from ${JSON.stringify(spelled)}`
}

export function everyFor(name: string, spelled: string): string {
  return `import ${EVERY} as ${name} from ${JSON.stringify(spelled)}`
}

export type Taking = {
  readonly name: string
  readonly from: string
  readonly type: boolean
  readonly every: boolean
}

export function linesOf(taking: readonly Taking[]): readonly string[] {
  const lines: string[] = []
  const found = new Map<string, Taking[]>()
  for (const one of taking) {
    if (one.every) {
      lines.push(everyFor(one.name, one.from))
      continue
    }
    const held = found.get(one.from)
    if (held === undefined) found.set(one.from, [one])
    else held.push(one)
  }
  for (const [from, held] of found) {
    const whole = held.every((one) => one.type)
    const names = held.map((one) => (whole || !one.type ? one.name : `type ${one.name}`))
    lines.push(`import ${whole ? "type " : ""}{ ${names.join(", ")} } from ${JSON.stringify(from)}`)
  }
  return lines
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

function wholeOut(text: string, source: ts.SourceFile, one: ts.ImportDeclaration): Taken {
  const ended = one.getEnd()
  const from = one.getStart(source)
  return { old: text.slice(from, text[ended] === LINE ? ended + 1 : ended), new: "" }
}

export function withoutName(text: string, source: ts.SourceFile, named: string): Taken | null {
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const bound = namedIn(one)
    if (bound === null) {
      if (everyOf(one) !== named) continue
      return wholeOut(text, source, one)
    }
    const gone = bound.elements.find((each) => each.name.text === named)
    if (gone === undefined) continue
    if (bound.elements.length === 1) return wholeOut(text, source, one)
    const head = text.slice(one.getStart(source), one.getEnd())
    return { old: head, new: withoutOne(text, one, bound, gone) }
  }
  return null
}

export function withName(
  text: string,
  source: ts.SourceFile,
  spelled: string,
  named: string,
  type: boolean
): Taken | null {
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const bound = namedIn(one)
    const from = one.moduleSpecifier
    if (bound === null || !ts.isStringLiteral(from) || from.text !== spelled) continue
    if (bound.elements.some((each) => each.name.text === named)) return null
    const whole = one.importClause?.isTypeOnly === true
    const marked = whole && !type
    const kept = bound.elements.map((each) => {
      const held = text.slice(each.getStart(source), each.getEnd())
      return marked ? `type ${held}` : held
    })
    const added = !whole && type ? `type ${named}` : named
    const head = `import ${whole && type ? "type " : ""}`
    const tail = text.slice(from.getStart(source), from.getEnd())
    return {
      old: text.slice(one.getStart(source), one.getEnd()),
      new: `${head}{ ${[...kept, added].join(", ")} } from ${tail}`,
    }
  }
  return null
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
