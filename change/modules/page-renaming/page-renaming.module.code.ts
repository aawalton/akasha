import { basename, dirname, join, relative } from "node:path"
import { restatedIn } from "akasha/change/modules/address-restating/address-restating.module.code.ts"
import {
  type Answer,
  type FileChange,
  gathered,
  pathsIn,
  refusing,
  type Splice,
  splicedIn,
  splicing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { exportRenamed } from "akasha/change/modules/export-renaming/export-renaming.module.code.ts"
import {
  carriedBy,
  refusalOver,
} from "akasha/change/modules/file-carrying/file-carrying.module.code.ts"
import { spelledAnew } from "akasha/change/modules/package-naming/package-naming.module.code.ts"
import { statedIn } from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import {
  carrying,
  holdingIn,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { slugRenamed } from "akasha/change/modules/slug-renaming/slug-renaming.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { placingOver } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { reachesIn } from "akasha/code/workspace/modules/package-manifest/package-manifest.module.code.ts"
import type { Beside as Sidecar } from "akasha/page/index/modules/beside-declaring/beside-declaring.module.code.ts"
import { importingOf } from "akasha/page/index/modules/path-naming/path-naming.module.code.ts"
import type { Shaped } from "akasha/page/index/modules/reaching/reaching.module.code.ts"
import { filesIn } from "akasha/page/index/modules/tree-reading/tree-reading.module.code.ts"
import { namedAs, slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { spellingsIn } from "akasha/page/modules/export-name/modules/export-spelling/export-spelling.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import {
  besideAt,
  secretAt,
  uncommittedAt,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  uncommittedPartAt,
  uncommittedPartsOf,
} from "akasha/page/modules/file-parts/page-file-parts.module.code.ts"
import { dashEachCapital } from "akasha/page/naming/folding/modules/dash-each-capital/dash-each-capital.module.code.ts"
import {
  foldersUnder,
  namesAbove,
  strippedOf,
} from "akasha/page/naming/modules/folder-named/folder-named.module.code.ts"
import { folderFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import ts from "typescript"

const TYPED = ".ts"

const SLUG = "slug"

const PAGE_TYPE_KEY = "type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const PAGE_TYPE = "page-type"

const NAME = "name"

const FIRST = 1

export type Asked = {
  readonly at: string
  readonly to: string
  readonly addressesRestated?: boolean
}

export type Held = {
  readonly slug: string
  readonly pageTypeSlug: string
  readonly said: ReadonlyMap<string, string>
}

export function addressOf(known: Shaped, held: Held, slug: string): string {
  const scoping = known.scoping(held.pageTypeSlug)
  if (scoping === null) return namedAs(held.pageTypeSlug, slug, null)
  const said = held.said.get(exportedAs(scoping.scopePropertySlug))
  if (said === undefined) return namedAs(held.pageTypeSlug, slug, null)
  return namedAs(held.pageTypeSlug, slug, slugIn(said) ?? said)
}

type Read = { readonly held: Held } | { readonly refused: string }

type Move = { readonly from: string; readonly to: string }

function readIn(at: string, text: string): Read {
  const source = parsedAs(at, text)
  const said = statedIn(source)
  const slug = said.get(SLUG)
  const pageTypeSlug = said.get(PAGE_TYPE_KEY) ?? said.get(PAGE_TYPE_SLUG)
  if (slug === undefined) return { refused: `\`${at}\` states no \`${SLUG}\`` }
  if (pageTypeSlug === undefined) return { refused: `\`${at}\` states no \`${PAGE_TYPE_SLUG}\`` }
  return {
    held: {
      slug: slug.text,
      pageTypeSlug: slugIn(pageTypeSlug.text) ?? pageTypeSlug.text,
      said: new Map([...said].map(([key, one]) => [key, one.text])),
    },
  }
}

type Beside = (path: string) => string | null

function heldIn(world: World, held: Held, propertySlug: string): string | null | undefined {
  const filed = world.index.filePropertiesAt().get(held.pageTypeSlug)
  if (filed?.has(propertySlug) === true) return filed.get(propertySlug)
  const keys = world.index.fileKeysAt()
  return keys.has(propertySlug) ? keys.get(propertySlug) : undefined
}

function besideIn(world: World, held: Held): readonly Beside[] {
  const found: Beside[] = []
  for (const [key, ending] of held.said) {
    const propertySlug = dashEachCapital(key)
    if (heldIn(world, held, propertySlug) !== null) continue
    found.push((path) => besideAt(path, propertySlug, ending))
  }
  return found
}

function partedIn(world: World, at: string, slug: string, beside: Sidecar): readonly Beside[] {
  if (!beside.uncommitted) return [(path) => besideAt(path, slug, beside.held)]
  const there = holdingIn(world)
  return uncommittedPartsOf(at, slug, beside.held, there).map(
    (_one, index) => (path: string) => uncommittedPartAt(path, slug, beside.held, index + FIRST)
  )
}

function reservedIn(world: World, held: Held, at: string): readonly Beside[] {
  const said = world.index.sidecarsAt().get(held.pageTypeSlug)
  if (said === undefined) return []
  const found: Beside[] = []
  if (said.secret) found.push(secretAt)
  if (said.uncommitted) found.push(uncommittedAt)
  for (const [slug, beside] of said.besides) {
    if (heldIn(world, held, slug) !== null) continue
    found.push(...partedIn(world, at, slug, beside))
  }
  return found.filter((named) => {
    const path = named(at)
    return path !== null && world.textOf(path) !== null
  })
}

function movesOver(beside: readonly Beside[], at: string, to: string): readonly Move[] {
  const found = new Map<string, Move>()
  for (const named of beside) {
    const from = named(at)
    const next = named(to)
    if (from === null || next === null || found.has(from)) continue
    found.set(from, { from, to: next })
  }
  return [...found.values()].sort((one, two) =>
    one.from < two.from ? -1 : one.from > two.from ? 1 : 0
  )
}

function underIn(
  world: World,
  from: string,
  to: string,
  held: Held,
  given: Asked,
  moved: ReadonlySet<string>
): readonly Move[] {
  const paths = world.under(from)
  const folders = foldersUnder(world.root, from, to, held.slug, given.to, paths)
  const opening = `${held.slug}.${held.pageTypeSlug}.`
  const found: Move[] = []
  for (const path of paths) {
    if (moved.has(path)) continue
    const at = dirname(path)
    const lands = folders.get(at) ?? join(to, relative(from, at))
    const name = basename(path)
    const takes =
      at === from && name.startsWith(opening)
        ? `${given.to}.${held.pageTypeSlug}.${name.slice(opening.length)}`
        : name
    found.push({ from: path, to: join(lands, takes) })
  }
  return found.sort((one, two) => (one.from < two.from ? -1 : one.from > two.from ? 1 : 0))
}

function ownsIn(files: readonly string[], held: Held): boolean {
  const opening = `${held.slug}.${held.pageTypeSlug}.`
  return files.length > 0 && files.every((one) => basename(one).startsWith(opening))
}

export function tailOf(slug: string, named: string, to: string): string | null {
  if (named === "" || !slug.endsWith(`-${named}`)) return null
  const opening = slug.slice(0, slug.length - named.length)
  return to.startsWith(opening) && to.length > opening.length ? to.slice(opening.length) : null
}

function foldedAs(world: World, held: Held, given: Asked, folder: string): string {
  if (held.pageTypeSlug === PAGE_TYPE) return basename(folder)
  const above = namesAbove(world.root, folder, folder, given.to)
  return strippedOf(given.to, above) ?? folderFor(held.pageTypeSlug, given.to)
}

function namesFolder(world: World, held: Held, folder: string): boolean {
  const above = namesAbove(world.root, folder, folder, held.slug)
  return strippedOf(held.slug, above) === basename(folder)
}

function landingIn(world: World, held: Held, given: Asked): string {
  const name = `${given.to}.${held.pageTypeSlug}${TYPED}`
  const folder = dirname(given.at)
  const owns = ownsIn(filesIn(world.root, folder), held) || namesFolder(world, held, folder)
  if (!owns) return join(folder, name)
  return join(dirname(folder), foldedAs(world, held, given, folder), name)
}

const UNDER = "/"

const WAYS = "exports"

type Way = {
  readonly at: string
  readonly was: string
  readonly to: string
  readonly moved: ReadonlyMap<string, string>
  readonly importers: readonly string[]
}

function namersIn(world: World, moved: ReadonlyMap<string, string>): readonly string[] {
  const found = new Set<string>()
  for (const one of moved.keys()) {
    for (const each of world.index.importersOf(one)) found.add(each)
  }
  for (const one of moved.keys()) found.delete(one)
  return [...found].sort()
}

function wayIn(
  world: World,
  moved: ReadonlyMap<string, string>,
  was: string,
  to: string
): Way | null {
  const ending = `${UNDER}${was}`
  for (const at of world.index.manifestsBeside(world.index.fileKeysAt())) {
    const text = world.textOf(at)
    if (text === null) continue
    for (const [said, path] of reachesIn(dirname(at), text)) {
      if (!moved.has(path) || !said.endsWith(ending)) continue
      const next = `${said.slice(0, -ending.length)}${UNDER}${to}`
      return { at, was: said, to: next, moved, importers: namersIn(world, moved) }
    }
  }
  return null
}

function waysIn(node: ts.Node): ts.ObjectLiteralExpression | null {
  if (!ts.isObjectLiteralExpression(node)) return null
  for (const one of node.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    if (one.name.text !== WAYS) continue
    return ts.isObjectLiteralExpression(one.initializer) ? one.initializer : null
  }
  return null
}

function waySplices(way: Way, text: string, was: string, to: string): readonly Splice[] {
  const source = ts.parseJsonText(way.at, text)
  const first = source.statements[0]
  if (first === undefined) return []
  const held = waysIn(first.expression)
  if (held === null) return []
  const folder = dirname(way.at)
  const found: Splice[] = []
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    const value = one.initializer
    if (!ts.isStringLiteral(value)) continue
    if (one.name.text === `.${UNDER}${was}`) {
      found.push({
        from: one.name.getStart(source),
        to: one.name.getEnd(),
        put: JSON.stringify(`.${UNDER}${to}`),
      })
    }
    const next = way.moved.get(join(folder, value.text))
    if (next === undefined) continue
    found.push({
      from: value.getStart(source),
      to: value.getEnd(),
      put: JSON.stringify(`.${UNDER}${relative(folder, next)}`),
    })
  }
  return found
}

function wayEdits(world: World, way: Way, was: string, to: string): readonly FileChange[] {
  const edits: FileChange[] = []
  const text = world.textOf(way.at)
  if (text !== null) {
    edits.push(...splicedIn(way.at, text, waySplices(way, text, was, to)))
  }
  for (const path of way.importers) {
    const body = world.textOf(path)
    if (body === null) continue
    edits.push(...splicing(path, body, spelledAnew(path, body, way.was, way.to)))
  }
  return edits
}

export function pageRenamed(world: World, given: Asked): Answer {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const read = readIn(given.at, text)
  if ("refused" in read) return refusing(read.refused)
  const held = read.held
  let lands: string
  let beside: readonly Beside[]
  try {
    beside = [...besideIn(world, held), ...reservedIn(world, held, given.at)]
    lands = landingIn(world, held, given)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${why}, so no file was moved`)
  }
  const answers: Answer[] = []
  let folded = stating([])
  let seen = world
  if (given.to === held.slug && lands === given.at) {
    return refusing(`\`${given.to}\` is the slug this page carries, in the folder that slug names`)
  }
  const moves: Move[] = [{ from: given.at, to: lands }, ...movesOver(beside, given.at, lands)]
  const wasFolder = dirname(given.at)
  const nowFolder = dirname(lands)
  if (nowFolder !== wasFolder) {
    moves.push(
      ...underIn(world, wasFolder, nowFolder, held, given, new Set(moves.map((one) => one.from)))
    )
  }
  const moved = new Map(moves.map((one) => [one.from, one.to]))
  const way = wayIn(world, moved, held.slug, given.to)
  if (given.to !== held.slug && given.addressesRestated !== true) {
    const known = seen.index.knownIn()
    const was = addressOf(known, held, held.slug)
    const addressed = restatedIn(seen, new Map([[was, addressOf(known, held, given.to)]]))
    if (addressed.refused !== null) return addressed
    answers.push(addressed)
    folded = gathered(answers)
    if (folded.refused !== null) return folded
    seen = carrying(seen, addressed)
  }
  const why = refusalOver(seen, moved)
  if (why !== null) return refusing(why)
  const carriedEdits = carriedBy(seen, moved)
  if (typeof carriedEdits === "string") return refusing(carriedEdits)
  const carried = stating(carriedEdits)
  answers.push(carried)
  folded = gathered(answers)
  if (folded.refused !== null) return folded
  seen = carrying(seen, carried)
  if (given.to !== held.slug) {
    const level = tailOf(held.slug, held.said.get(NAME) ?? "", given.to)
    const said = slugRenamed(seen, { at: lands, to: given.to, name: level ?? undefined })
    if (said.refused !== null) return said
    answers.push(said)
    folded = gathered(answers)
    if (folded.refused !== null) return folded
    seen = carrying(seen, said)
    for (const one of spellingsIn(seen.textOf, lands, held.said, held.slug, given.to)) {
      const over = [one.at, ...importingOf(seen.index, new Map([[one.at, one.at]]))]
      const placed = placingOver(pathsIn(seen.over), seen.textOf)
      const spelled = exportRenamed(seen.root, one.at, over, one.of, one.to, seen.textOf, placed)
      if (spelled.refused !== null) return spelled
      answers.push(spelled)
      folded = gathered(answers)
      if (folded.refused !== null) return folded
      seen = carrying(seen, spelled)
    }
  }
  if (way !== null) {
    const edits = wayEdits(seen, way, held.slug, given.to)
    if (edits.length > 0) {
      answers.push(stating(edits))
      folded = gathered(answers)
      if (folded.refused !== null) return folded
    }
  }
  return folded
}
