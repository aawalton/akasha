import ts from "typescript"
import { parsedAs } from "../../../../code-system/code-source/code-source.module.code.ts"
import { landingOf } from "../../../../code-system/code-specifier/code-specifier.module.code.ts"
import { NOT_A_RELATION } from "../../../../pages-system/indexes/index/index-relation/index-relation.index.code.ts"
import type { Value } from "../../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import { valueIn } from "../../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  everyOfTypeAnswered,
  namersOf,
  readingIn,
} from "../../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import {
  knownIn,
  namesIn,
  reaches,
  recordsIn,
  type Shaped,
} from "../../../../pages-system/indexes/reaching/reaching.module.code.ts"
import { addressIn } from "../../../../pages-system/page/page-address/page-address.module.code.ts"
import type { Renaming, Spot } from "../type-renaming/type-renaming.module.code.ts"
import { splicedIn } from "../type-renaming/type-renaming.module.code.ts"

export type Addressed = {
  readonly key: string
  readonly named: string
}

export function addressedIn(value: Value, known: Shaped, id: string): readonly Addressed[] {
  const found: Addressed[] = []
  const seen = new Set<string>()
  const take = (key: string, propertySlug: string, held: unknown): undefined => {
    const wanted = known.targetOf(propertySlug)
    if (wanted === null) return
    for (const named of namesIn(held)) {
      const reached = reaches(named, wanted, known)
      if ("refused" in reached || reached.id !== id || seen.has(`${key} ${named}`)) continue
      seen.add(`${key} ${named}`)
      found.push({ key, named })
    }
  }
  for (const [key, held] of Object.entries(value)) {
    if (NOT_A_RELATION.has(key) || held === null) continue
    const propertySlug = known.slugOfKey(key)
    if (propertySlug === null) continue
    if (known.targetOf(propertySlug) !== null) {
      take(key, propertySlug, held)
      continue
    }
    const fields = known.fieldsOf(propertySlug)
    if (fields.length === 0) continue
    for (const entry of recordsIn(held)) {
      for (const [inner, said] of Object.entries(entry)) {
        const field = known.slugOfKey(inner)
        if (field !== null && fields.includes(field)) take(inner, field, said)
      }
    }
  }
  return found
}

export function readdressed(named: string, one: Renaming, type: boolean): string | null {
  const address = addressIn(named)
  if (address.kind === "id") return null
  if (address.kind === "bare") return type ? one.now : null
  if (type) return `${address.pageTypeSlug}/${one.now}`
  return address.pageTypeSlug === one.was ? `${one.now}/${address.slug}` : null
}

export type Spelled = {
  readonly said: ReadonlyMap<string, string>
  readonly keys: ReadonlySet<string>
}

export type Spelling = ReadonlyMap<string, Spelled>

type Held = { readonly said: Map<string, string>; readonly keys: Set<string> }

export function spellingOver(
  root: string,
  one: Renaming,
  textOf: (path: string) => string | null
): Spelling {
  const loadedAt = (path: string): Value | null => {
    const text = textOf(path)
    return text === null ? null : valueIn(text)
  }
  const known = knownIn(readingIn(root), root, loadedAt)
  const found = new Map<string, Held>()
  const take = (id: string, type: boolean): undefined => {
    for (const path of new Set(namersOf(root, id).map((named) => named.path))) {
      const value = loadedAt(path)
      if (value === null) continue
      for (const held of addressedIn(value, known, id)) {
        const next = readdressed(held.named, one, type)
        if (next === null || next === held.named) continue
        const at = found.get(path) ?? { said: new Map(), keys: new Set() }
        at.said.set(held.named, next)
        at.keys.add(held.key)
        found.set(path, at)
      }
    }
  }
  take(one.id, true)
  for (const held of everyOfTypeAnswered(root, one.was)) take(held.id, false)
  return found
}

export function respelled(
  path: string,
  text: string,
  said: ReadonlyMap<string, string>,
  keys: ReadonlySet<string>
): string {
  if (said.size === 0) return text
  const source = parsedAs(path, text)
  const spots: (readonly [Spot, string])[] = []
  const walk = (node: ts.Node, inside: boolean): undefined => {
    let held = inside
    if (ts.isPropertyAssignment(node)) {
      const key =
        ts.isIdentifier(node.name) || ts.isStringLiteral(node.name) ? node.name.text : null
      held = key !== null && keys.has(key)
    }
    if (held && ts.isStringLiteral(node)) {
      const next = said.get(node.text)
      if (next !== undefined) {
        spots.push([{ start: node.getStart(source), end: node.getEnd() }, JSON.stringify(next)])
      }
    }
    ts.forEachChild(node, (one) => walk(one, held))
  }
  ts.forEachChild(source, (one) => walk(one, false))
  return spots.length === 0 ? text : splicedIn(text, spots)
}

function stands(node: ts.Identifier): boolean {
  const up = node.parent
  if (up === undefined) return true
  if (ts.isPropertyAssignment(up) && up.name === node) return false
  if (ts.isPropertyAccessExpression(up) && up.name === node) return false
  if (ts.isPropertySignature(up) && up.name === node) return false
  return true
}

function spotOf(source: ts.SourceFile, node: ts.Node): Spot {
  return { start: node.getStart(source), end: node.getEnd() }
}

export function renamed(
  path: string,
  text: string,
  was: string,
  now: string,
  from: string | null
): string | null {
  const source = parsedAs(path, text)
  const spots: (readonly [Spot, string])[] = []
  let local = from === null ? was : null
  for (const statement of from === null ? [] : source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) {
      continue
    }
    if (landingOf(path, statement.moduleSpecifier.text) !== from) continue
    const bindings = statement.importClause?.namedBindings
    if (bindings === undefined || !ts.isNamedImports(bindings)) continue
    for (const one of bindings.elements) {
      if ((one.propertyName?.text ?? one.name.text) !== was) continue
      if (one.propertyName === undefined) local = one.name.text
      else spots.push([spotOf(source, one.propertyName), now])
    }
  }
  if (local !== null) {
    const held = local
    const walk = (node: ts.Node): undefined => {
      if (ts.isIdentifier(node) && node.text === held && stands(node)) {
        spots.push([spotOf(source, node), now])
      }
      ts.forEachChild(node, walk)
    }
    ts.forEachChild(source, walk)
  }
  return spots.length === 0 ? null : splicedIn(text, spots)
}

const EDGE = new Set(["/", ".", "*"])

const WORD = /[a-z0-9-]/

const TAIL = /[a-z0-9]/

function contentOf(node: ts.Node): readonly [number, number] | null {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return [1, 1]
  if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node)) return [1, 2]
  return ts.isTemplateTail(node) ? [1, 1] : null
}

export function pathSpelled(content: string, was: string, now: string): string | null {
  let out = ""
  let at = 0
  let found = false
  for (let cut = content.indexOf(was); cut >= 0; cut = content.indexOf(was, at)) {
    const end = cut + was.length
    const before = cut === 0 ? "" : (content[cut - 1] ?? "")
    const after = end === content.length ? "" : (content[end] ?? "")
    const held = EDGE.has(before) && (after === "" || EDGE.has(after))
    out = `${out}${content.slice(at, cut)}${held ? now : was}`
    found = found || held
    at = end
  }
  return found ? `${out}${content.slice(at)}` : null
}

export function pathRespelled(path: string, text: string, was: string, now: string): string | null {
  if (!text.includes(was)) return null
  const source = parsedAs(path, text)
  const spots: (readonly [Spot, string])[] = []
  const walk = (node: ts.Node): undefined => {
    const span = contentOf(node)
    if (span !== null) {
      const start = node.getStart(source) + span[0]
      const end = node.getEnd() - span[1]
      const next = pathSpelled(text.slice(start, end), was, now)
      if (next !== null) spots.push([{ start, end }, next])
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return spots.length === 0 ? null : splicedIn(text, spots)
}

export function namesStill(text: string, was: string): readonly number[] {
  const found: number[] = []
  const lines = text.split("\n")
  for (let at = 0; at < lines.length; at = at + 1) {
    const line = lines[at] ?? ""
    for (let cut = line.indexOf(was); cut >= 0; cut = line.indexOf(was, cut + was.length)) {
      const end = cut + was.length
      const before = cut === 0 ? "" : (line[cut - 1] ?? "")
      const after = end === line.length ? "" : (line[end] ?? "")
      if (!WORD.test(before) && !TAIL.test(after)) {
        found.push(at + 1)
        break
      }
    }
  }
  return found
}
