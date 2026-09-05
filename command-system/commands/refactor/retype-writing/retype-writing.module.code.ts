import { parsedAs } from "@akasha/code-system/code-source"
import { typed } from "@akasha/code-system/code-typing"
import { uncommittedNamed } from "@akasha/pages/page-file-name"
import ts from "typescript"
import { repointed } from "../../../../code-system/path-repointing/path-repointing.module.code.ts"
import {
  importingOf,
  spellingOf,
} from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import { textOf } from "../../../asking/asking.module.code.ts"
import { bodyAt } from "../../../commit-reading/commit-reading.module.code.ts"
import type { FileCarry, FileEdit } from "../../../landing/landing.module.code.ts"
import type { Carry as Reading } from "../../../reading/reading.module.code.ts"
import { blobIdOf } from "../../../reading/reading.module.code.ts"
import { manifestingOver } from "../../move/manifesting/move-manifesting.module.code.ts"
import type { Spot } from "../type-renaming/type-renaming.module.code.ts"
import { splicedIn, statedIn } from "../type-renaming/type-renaming.module.code.ts"
import { respelled } from "../type-respelling/type-respelling.module.code.ts"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const BYTES = new TextEncoder()

export type Retyping = {
  readonly id: string
  readonly path: string
  readonly slug: string
  readonly was: string
  readonly now: string
  readonly typePath: string
  readonly typeName: string
}

export type Carry = {
  readonly from: string
  readonly to: string
}

export type Retyped = { readonly text: string } | { readonly refused: string }

export type Spelled = {
  readonly said: ReadonlyMap<string, string>
  readonly keys: ReadonlySet<string>
}

export type Spelling = ReadonlyMap<string, Spelled>

function satisfiedIn(source: ts.SourceFile): ts.Identifier | null {
  let found: ts.Identifier | null = null
  const walk = (node: ts.Node): undefined => {
    if (
      found === null &&
      ts.isSatisfiesExpression(node) &&
      ts.isTypeReferenceNode(node.type) &&
      ts.isIdentifier(node.type.typeName)
    ) {
      found = node.type.typeName
    }
    ts.forEachChild(node, walk)
  }
  ts.forEachChild(source, walk)
  return found
}

export type Imported =
  | { readonly name: Spot; readonly specifier: Spot }
  | { readonly shared: true }
  | null

export function importedIn(source: ts.SourceFile, name: string): Imported {
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement)) continue
    const clause = statement.importClause
    const bindings = clause?.namedBindings
    if (bindings === undefined || !ts.isNamedImports(bindings)) continue
    if (!bindings.elements.some((one) => one.name.text === name)) continue
    const only = bindings.elements[0]
    const held = statement.moduleSpecifier
    if (bindings.elements.length > 1 || clause?.name !== undefined) return { shared: true }
    if (only === undefined || only.propertyName !== undefined) return { shared: true }
    if (!ts.isStringLiteral(held)) return { shared: true }
    return {
      name: { start: only.name.getStart(source), end: only.name.getEnd() },
      specifier: { start: held.getStart(source), end: held.getEnd() },
    }
  }
  return null
}

export function retypedBody(path: string, text: string, one: Retyping, specifier: string): Retyped {
  const source = parsedAs(path, text)
  const satisfied = satisfiedIn(source)
  if (satisfied === null) {
    return { refused: `${path} satisfies no type, so the type it becomes would go unwritten` }
  }
  const was = satisfied.text
  const held = importedIn(source, was)
  if (held === null) return { refused: `${path} imports \`${was}\` from nowhere this can read` }
  if ("shared" in held) {
    return {
      refused: `${path} imports \`${was}\` beside other names, so that import names more than it`,
    }
  }
  const spot = statedIn(path, text, [PAGE_TYPE_SLUG])?.keyed.get(PAGE_TYPE_SLUG)
  if (spot === undefined) {
    return {
      refused: `${path} states no \`${PAGE_TYPE_SLUG}\`, so which page type it is is unsaid`,
    }
  }
  return {
    text: splicedIn(text, [
      [held.name, one.typeName],
      [held.specifier, JSON.stringify(specifier)],
      [{ start: satisfied.getStart(source), end: satisfied.getEnd() }, one.typeName],
      [spot, JSON.stringify(one.now)],
    ]),
  }
}

export type Rewriting = {
  readonly one: Retyping
  readonly moved: ReadonlyMap<string, string>
  readonly spelling: Spelling
  readonly specifier: string
}

function rewritten(held: Rewriting, from: string, to: string, text: string): Retyped {
  let next = text
  if (from === held.one.path) {
    const said = retypedBody(from, next, held.one, held.specifier)
    if ("refused" in said) return said
    next = said.text
  }
  const spelled = held.spelling.get(from)
  if (spelled !== undefined) next = respelled(from, next, spelled.said, spelled.keys)
  return { text: repointed(from, to, next, held.moved) }
}

type Worked = {
  readonly changes: readonly FileEdit[]
  readonly readings: readonly Reading[]
  readonly moving: readonly FileCarry[]
  readonly repointed: readonly string[]
}

type Working = Worked | { readonly refused: string }

export function carriedIn(
  root: string,
  base: string,
  held: Rewriting,
  carries: readonly Carry[]
): Working {
  const changes: FileEdit[] = []
  const readings: Reading[] = []
  const moving: FileCarry[] = []
  for (const carry of carries) {
    if (uncommittedNamed(carry.from)) {
      moving.push({ from: carry.from, to: carry.to })
      continue
    }
    const bytes = bodyAt(root, base, carry.from)
    if (bytes === null) return { refused: `${carry.from} is in no commit at \`${base}\`` }
    readings.push({ was: carry.from, now: carry.to, from: blobIdOf(bytes) })
    changes.push({ path: carry.from, body: null })
    if (!typed(carry.from)) {
      changes.push({ path: carry.to, body: bytes, carried: true })
      continue
    }
    const text = textOf(bytes)
    if (text === null) {
      return { refused: `${carry.from} is TypeScript and its bytes are not utf-8` }
    }
    const next = rewritten(held, carry.from, carry.to, text)
    if ("refused" in next) return next
    changes.push({ path: carry.to, body: BYTES.encode(next.text), carried: true })
  }
  return { changes, readings, moving, repointed: [] }
}

export function namingOver(
  root: string,
  base: string,
  moved: ReadonlyMap<string, string>,
  spelling: Spelling
): { readonly paths: readonly string[] } | { readonly unread: string } {
  const reading = importingOf(root, moved)
  if ("unread" in reading) return reading
  const found = new Set<string>(reading.importers)
  for (const path of spelling.keys()) found.add(path)
  for (const path of spellingOf(root, base, moved, found)) found.add(path)
  return { paths: [...found].sort() }
}

export function repointedOver(
  root: string,
  base: string,
  held: Rewriting,
  paths: readonly string[]
): Working {
  const changes: FileEdit[] = []
  const readings: Reading[] = []
  const repointing: string[] = []
  for (const path of paths) {
    if (!typed(path) || held.moved.has(path)) continue
    const bytes = bodyAt(root, base, path)
    if (bytes === null) continue
    const text = textOf(bytes)
    if (text === null) return { refused: `${path} names what moved and its bytes are not utf-8` }
    const next = rewritten(held, path, path, text)
    if ("refused" in next) return next
    if (next.text === text) continue
    repointing.push(path)
    readings.push({ was: path, now: path, from: blobIdOf(bytes) })
    changes.push({ path, body: BYTES.encode(next.text), carried: true })
  }
  return { changes, readings, moving: [], repointed: repointing }
}

export function manifested(
  root: string,
  base: string,
  moved: ReadonlyMap<string, string>,
  bodyText: (path: string) => string | null
): Worked {
  const changes: FileEdit[] = []
  const readings: Reading[] = []
  const repointing: string[] = []
  for (const one of manifestingOver(moved, bodyText)) {
    const bytes = bodyAt(root, base, one.at)
    if (bytes === null) continue
    repointing.push(one.at)
    readings.push({ was: one.at, now: one.at, from: blobIdOf(bytes) })
    changes.push({ path: one.at, body: BYTES.encode(one.text), carried: true })
  }
  return { changes, readings, moving: [], repointed: repointing }
}
