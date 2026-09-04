import { basename, dirname, join } from "node:path"
import { parsedAs } from "@akasha/code-system/code-source"
import { typed } from "@akasha/code-system/code-typing"
import { listedAt, namersOf, readingIn } from "@akasha/indexes"
import { knownIn } from "@akasha/indexes/reaching"
import type { Reading as Filed } from "@akasha/indexes/shape"
import { addressIn } from "@akasha/pages-system/page-address"
import { besideOf } from "@akasha/pages-system/page-beside"
import { typedAs } from "@akasha/pages-system/page-export-name"
import { uncommittedNamed } from "@akasha/pages-system/page-file-name"
import type { Carried } from "@akasha/pages-system/page-type-properties"
import { propertiesIfNamedOf } from "@akasha/pages-system/page-type-properties"
import type { Value } from "@akasha/pages-system/page-value"
import { valuesOver } from "@akasha/pages-system/page-value"
import ts from "typescript"
import type { Asked as Asking } from "../../../command-system/asking/asking.module.code.ts"
import { counted, landingAsked, textOf } from "../../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../command-system/calling/calling.module.code.ts"
import { answering } from "../../../command-system/calling/calling.module.code.ts"
import { bodyAt } from "../../../command-system/commit-reading/commit-reading.module.code.ts"
import type { FileCarry, FileEdit } from "../../../command-system/landing/landing.module.code.ts"
import { baseOf } from "../../../command-system/landing/landing.module.code.ts"
import type { Carry as Reading } from "../../../command-system/reading/reading.module.code.ts"
import { blobIdOf, carryReadings } from "../../../command-system/reading/reading.module.code.ts"
import { manifestingOver } from "../../move/manifesting/move-manifesting.module.code.ts"
import { importingOf, spellingOf } from "../../move/naming/move-naming.module.code.ts"
import { outsideIn, saidFrom } from "../../move/outside/move-outside.module.code.ts"
import { repointed } from "../../move/repointing/move-repointing.module.code.ts"
import { glassIn, messageIn } from "../../write/write.command.code.ts"
import { bodyTextOf, were } from "../landing/refactor-landing.module.code.ts"
import type { Spot } from "../type-renaming/type-renaming.module.code.ts"
import { splicedIn, statedIn } from "../type-renaming/type-renaming.module.code.ts"
import { addressedIn, respelled } from "../type-respelling/type-respelling.module.code.ts"

const PAGE_TYPE = "page-type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const MANIFEST = "package.json"

const NAME = "name"

const EXPORTS = "exports"

const HERE = "."

const TS = ".ts"

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

export type Asked = { readonly retyping: Retyping } | { readonly refused: string }

export type Reached = { readonly said: string } | { readonly refused: string }

export type Retyped = { readonly text: string } | { readonly refused: string }

export type Held = {
  readonly at: string
  readonly folder: string
  readonly text: string
}

export type Spelled = {
  readonly said: ReadonlyMap<string, string>
  readonly keys: ReadonlySet<string>
}

export type Spelling = ReadonlyMap<string, Spelled>

function keyedBy(carried: readonly Carried[]): ReadonlyMap<string, Carried> {
  const found = new Map<string, Carried>()
  for (const one of carried) {
    if (!found.has(one.key)) found.set(one.key, one)
  }
  return found
}

export function unnamedIn(
  value: Value,
  was: string,
  now: string,
  given: string | Filed,
  pageOf: (path: string) => Value | null
): string | null {
  const there = propertiesIfNamedOf(now, given, pageOf)
  if (there === null) return `\`${now}\` names a page type whose properties could not be read`
  const wanted = keyedBy(there)
  const held = keyedBy(propertiesIfNamedOf(was, given, pageOf) ?? [])
  for (const key of Object.keys(value)) {
    if (wanted.has(key)) continue
    const said = `the page states \`${key}\`, and \`${now}\` reads no property by that key`
    const mine = held.get(key)
    if (mine === undefined) return said
    return `${said} — \`${was}\` reads \`${mine.pagePropertySlug}\` by it`
  }
  return null
}

export function retypingFor(
  given: string | Filed,
  named: string,
  now: string,
  pageOf: (path: string) => Value | null
): Asked {
  const address = addressIn(named)
  if (address.kind !== "qualified") {
    return {
      refused:
        `\`${named}\` names no page type — one slug is carried under many page types, so a ` +
        "retype takes the page type and the slug parted by `/`",
    }
  }
  const was = address.pageTypeSlug
  const slug = address.slug
  if (was === now) {
    return { refused: `\`${named}\` is already a \`${now}\`, so there is nothing to retype` }
  }
  const listed = listedAt(given, was, slug)
  const one = listed[0]
  if (one === undefined) return { refused: `no \`${was}\` carries the slug \`${slug}\`` }
  if (listed.length > 1) {
    return {
      refused: `${listed.length} pages carry \`${named}\`, so which one to retype is unanswered`,
    }
  }
  const filed = listedAt(given, PAGE_TYPE, now)
  const type = filed[0]
  if (type === undefined) return { refused: `no page type carries the slug \`${now}\`` }
  if (filed.length > 1) return { refused: `${filed.length} page types carry the slug \`${now}\`` }
  const value = pageOf(one.path)
  if (value === null) {
    return { refused: `${one.path} carries \`${named}\` and its body could not be read` }
  }
  const why = unnamedIn(value, was, now, given, pageOf)
  if (why !== null) return { refused: why }
  return {
    retyping: {
      id: one.id,
      path: one.path,
      slug,
      was,
      now,
      typePath: type.path,
      typeName: typedAs(now),
    },
  }
}

export function carriesFor(root: string, one: Retyping): readonly Carry[] {
  const dir = dirname(one.path)
  const was = `${one.slug}.${one.was}`
  const now = `${one.slug}.${one.now}`
  const found: Carry[] = [{ from: one.path, to: join(dir, `${now}${TS}`) }]
  for (const path of besideOf(root, one.path)) {
    const name = basename(path)
    found.push({ from: path, to: join(dir, `${now}${name.slice(was.length)}`) })
  }
  return found
}

export function readdressed(named: string, was: string, now: string): string | null {
  const address = addressIn(named)
  if (address.kind !== "qualified" || address.pageTypeSlug !== was) return null
  return `${now}/${address.slug}`
}

export function spellingOver(
  root: string,
  one: Retyping,
  pageOf: (path: string) => Value | null
): Spelling {
  const known = knownIn(readingIn(root), pageOf)
  const found = new Map<string, { said: Map<string, string>; keys: Set<string> }>()
  for (const path of new Set(namersOf(root, one.id).map((named) => named.path))) {
    const value = pageOf(path)
    if (value === null) continue
    for (const held of addressedIn(value, known, one.id)) {
      const next = readdressed(held.named, one.was, one.now)
      if (next === null) continue
      const at = found.get(path) ?? { said: new Map(), keys: new Set() }
      at.said.set(held.named, next)
      at.keys.add(held.key)
      found.set(path, at)
    }
  }
  return found
}

function manifestAbove(path: string, textOf: (at: string) => string | null): Held | null {
  let dir: string | null = dirname(path)
  while (dir !== null) {
    const at = join(dir, MANIFEST)
    const text = textOf(at)
    if (text !== null) return { at, folder: dir, text }
    dir = dir === HERE ? null : dirname(dir)
  }
  return null
}

function namedFrom(name: string, key: string): string {
  return key === HERE ? name : `${name}${key.slice(1)}`
}

export function exportedFrom(held: Held, to: string): Reached {
  const unanswered = `${held.at} exports no path naming ${to}, so how to import it is unanswered`
  let read: unknown
  try {
    read = JSON.parse(held.text)
  } catch {
    return { refused: `${held.at} is no readable JSON, so how to import ${to} is unanswered` }
  }
  if (read === null || typeof read !== "object") return { refused: unanswered }
  const value = read as Record<string, unknown>
  const name = value[NAME]
  if (typeof name !== "string") {
    return { refused: `${held.at} calls its package nothing, so how to import ${to} is unanswered` }
  }
  const said = value[EXPORTS]
  if (typeof said === "string") {
    return join(held.folder, said) === to ? { said: name } : { refused: unanswered }
  }
  if (said === null || typeof said !== "object") return { refused: unanswered }
  for (const [key, one] of Object.entries(said as Record<string, unknown>)) {
    if (typeof one === "string" && join(held.folder, one) === to) {
      return { said: namedFrom(name, key) }
    }
  }
  return { refused: unanswered }
}

export function specifierFor(
  from: string,
  to: string,
  textOf: (at: string) => string | null
): Reached {
  const there = manifestAbove(to, textOf)
  if (there === null) {
    return { refused: `${to} is under no ${MANIFEST}, so how to import it is unanswered` }
  }
  const here = manifestAbove(from, textOf)
  if (here !== null && here.at === there.at) return { said: saidFrom(dirname(from), to) }
  return exportedFrom(there, to)
}

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

type Rewriting = {
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

function carriedIn(
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

function namingOver(
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

function repointedOver(
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

function manifested(
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

export function retypeSaying(
  one: Retyping,
  carries: readonly Carry[],
  repointing: readonly string[],
  dry: boolean
): readonly string[] {
  return [
    `\`${one.was}/${one.slug}\` ${dry ? "would become" : "became"} \`${one.now}/${one.slug}\``,
    `${one.path} says which page type it is, and ${one.typePath} carries \`${one.now}\``,
    ...(dry ? carries.map((held) => `  ${held.from} -> ${held.to}`) : []),
    `${counted(carries.length, "file")} ${were(carries.length, dry)} carried`,
    repointing.length === 0
      ? "no file naming it needed repointing"
      : `${counted(repointing.length, "file")} naming it ${were(repointing.length, dry)} repointed`,
    ...(dry ? repointing.map((path) => `  ${path}`) : []),
  ]
}

export async function retypeLanded(
  given: Given,
  root: string,
  from: string,
  to: string,
  dryRun: boolean,
  argv: readonly string[],
  flags: readonly string[]
): Promise<Answer> {
  const base = baseOf(root)
  const bodyText = bodyTextOf(root, base)
  const pageOf = valuesOver(bodyText)
  const asked = retypingFor(root, from, to, pageOf)
  if ("refused" in asked) return answering([], [asked.refused], 1)
  const one = asked.retyping
  const specifier = specifierFor(one.path, one.typePath, bodyText)
  if ("refused" in specifier) return answering([], [specifier.refused], 1)
  const carries = carriesFor(root, one)
  const moved = new Map<string, string>(carries.map((held) => [held.from, held.to]))
  const held: Rewriting = {
    one,
    moved,
    spelling: spellingOver(root, one, pageOf),
    specifier: specifier.said,
  }
  const carried = carriedIn(root, base, held, carries)
  if ("refused" in carried) return answering([], [carried.refused], 2)
  const naming = namingOver(root, base, moved, held.spelling)
  if ("unread" in naming) return answering([], [naming.unread], 2)
  const repointing = repointedOver(root, base, held, naming.paths)
  if ("refused" in repointing) return answering([], [repointing.refused], 2)
  const manifests = manifested(root, base, moved, bodyText)
  const changes: FileEdit[] = [...carried.changes, ...repointing.changes, ...manifests.changes]
  const readings: Reading[] = [...carried.readings, ...repointing.readings, ...manifests.readings]
  const outside = outsideIn(root, base, moved, new Set(changes.map((each) => each.path)))
  if ("refusal" in outside) return answering([], [outside.refusal], 1)
  changes.push(...outside.changes)
  readings.push(...outside.carries)
  const glass = glassIn(argv, flags)
  if ("refusals" in glass) return answering([], glass.refusals, 1)
  const message = messageIn(argv, flags)
  if ("refusals" in message) return answering([], message.refusals, 1)
  const named = [...repointing.repointed, ...manifests.repointed, ...outside.paths].sort()
  const asking: Asking = {
    changes,
    message: message.message ?? `retype \`${from}\` as a \`${to}\``,
    dryRun,
    glass: glass.glass,
    unmoved: [],
    read: base,
    carries: carried.moving,
    saying: () => retypeSaying(one, carries, named, false),
  }
  const landing = await landingAsked({ ...given, root }, asking)
  if (!dryRun) {
    if (landing.code === 0) carryReadings(root, readings)
    return landing
  }
  return answering(
    [...retypeSaying(one, carries, named, true), ...landing.report],
    landing.refusals,
    landing.code
  )
}
