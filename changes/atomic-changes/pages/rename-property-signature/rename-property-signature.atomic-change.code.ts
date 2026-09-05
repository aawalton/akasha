import {
  declaredNamed,
  namingOf,
  readingOf,
  spelledAs,
  type Typing,
  typed,
  typingOver,
} from "@akasha/code-system/code-typing"
import ts from "typescript"
import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"

const ADDRESSED = /^([A-Za-z_$][A-Za-z0-9_$]*)\.([A-Za-z_$][A-Za-z0-9_$]*)$/

const NAMED = /^[A-Za-z_$][A-Za-z0-9_$]*$/

export type Asked = {
  readonly at: string
  readonly of: string
  readonly to: string
}

export type Renamed = {
  readonly bodies: ReadonlyMap<string, string> | null
  readonly refused: string | null
}

type Spot = {
  readonly start: number
  readonly end: number
  readonly put: string
}

type Addressed = {
  readonly type: string
  readonly property: string
}

function refusing(why: string): Renamed {
  return { bodies: null, refused: why }
}

function addressIn(of: string): Addressed | null {
  const found = ADDRESSED.exec(of)
  const type = found?.[1]
  const property = found?.[2]
  if (type === undefined || property === undefined) return null
  return { type, property }
}

function literalsIn(node: ts.TypeNode): readonly ts.TypeLiteralNode[] {
  if (ts.isTypeLiteralNode(node)) return [node]
  if (ts.isIntersectionTypeNode(node)) return node.types.flatMap(literalsIn)
  if (ts.isParenthesizedTypeNode(node)) return literalsIn(node.type)
  return []
}

function membersOf(held: ts.Node): readonly ts.TypeElement[] {
  if (ts.isInterfaceDeclaration(held)) return [...held.members]
  if (ts.isTypeAliasDeclaration(held)) {
    return literalsIn(held.type).flatMap((one) => [...one.members])
  }
  return []
}

function signaturesIn(held: ts.Node, key: string): readonly ts.Node[] {
  return membersOf(held).filter(
    (one) => ts.isPropertySignature(one) && ts.isIdentifier(one.name) && one.name.text === key
  )
}

function typesNamed(typing: Typing, path: string, named: string): readonly ts.Node[] {
  return declaredNamed(typing, path, named).filter(
    (one) => ts.isTypeAliasDeclaration(one) || ts.isInterfaceDeclaration(one)
  )
}

function outsideIn(typing: Typing, path: string, declared: ReadonlySet<ts.Node>): boolean {
  const source = typing.sourceAt(path)
  if (source === null) return true
  for (const one of declared) {
    if (!ts.isPropertySignature(one)) continue
    for (const held of typing.checker.getSymbolAtLocation(one.name)?.declarations ?? []) {
      if (held.getSourceFile() !== source) return true
    }
  }
  return false
}

function whyNot(given: Asked, address: Addressed | null): string | null {
  if (!typed(given.at)) return `\`${given.at}\` names no TypeScript body`
  if (address === null) {
    return `\`${given.of}\` names no property signature — say it as \`Type.property\``
  }
  if (!NAMED.test(given.to)) return `\`${given.to}\` is no name a property carries`
  if (address.property === given.to) return `\`${given.to}\` is the name it already carries`
  return null
}

export function renamePropertySignature(
  root: string,
  given: Asked,
  textOf: (path: string) => string | null
): Renamed {
  const address = addressIn(given.of)
  const why = whyNot(given, address)
  if (why !== null || address === null) return refusing(why ?? given.of)
  const reading = importingOf(root, new Map([[given.at, given.at]]))
  if ("unread" in reading) return refusing(reading.unread)
  const typing = typingOver(root, [given.at, ...reading.importers], readingOf(root, textOf))
  const types = typesNamed(typing, given.at, address.type)
  if (types.length === 0) return refusing(`\`${given.at}\` declares no type \`${address.type}\``)
  const declared = new Set(types.flatMap((one) => [...signaturesIn(one, address.property)]))
  if (declared.size === 0)
    return refusing(`\`${address.type}\` declares no \`${address.property}\``)
  for (const one of types) {
    if (signaturesIn(one, given.to).length > 0) {
      return refusing(`\`${address.type}\` already declares a \`${given.to}\``)
    }
  }
  if (outsideIn(typing, given.at, declared)) {
    return refusing(`\`${given.of}\` is declared outside \`${given.at}\` as well`)
  }
  const held = new Map<string, Spot[]>()
  const seen = new Set<string>()
  for (const found of namingOf(typing, root, declared)) {
    const spot = `${found.path}:${found.start}`
    if (seen.has(spot)) continue
    seen.add(spot)
    const at = held.get(found.path) ?? []
    at.push({
      start: found.start,
      end: found.end,
      put: spelledAs(found, address.property, given.to),
    })
    held.set(found.path, at)
  }
  if (held.size === 0) {
    return refusing(`nothing spells \`${given.of}\`, so there is nothing to respell`)
  }
  const bodies = new Map<string, string>()
  for (const [path, spots] of held) {
    const text = textOf(path)
    if (text === null) return refusing(`\`${path}\` would change and could not be read`)
    let body = text
    for (const one of [...spots].sort((here, there) => there.start - here.start)) {
      body = body.slice(0, one.start) + one.put + body.slice(one.end)
    }
    bodies.set(path, body)
  }
  return { bodies, refused: null }
}
