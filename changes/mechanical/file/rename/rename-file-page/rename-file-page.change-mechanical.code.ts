import { basename, dirname, extname, join, relative } from "node:path"
import { parsedAs } from "@akasha/code/code-source"
import { reachesIn } from "@akasha/code/package-manifest"
import { manifestsIn } from "@akasha/indexes/package-reaching"
import { besideAt, secretAt, uncommittedAt } from "@akasha/pages/page-file-name"
import { slugFor } from "@akasha/pages/page-property-key"
import ts from "typescript"
import { typedAs } from "../../../../../pages/export-name/page-export-name.module.code.ts"
import { importingOf } from "../../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import {
  folderFor,
  namedForThePlural,
} from "../../../../../pages/service/page-composing/page-composing.module.code.ts"
import {
  gathered,
  refusing,
  splicedIn,
  splicing,
  stating,
} from "../../../../modules/answer/change-answer.module.code.ts"
import type {
  Answer,
  FileChange,
  Splice,
} from "../../../../modules/answer/change-answer.module.types.ts"
import { spelledAnew } from "../../../../modules/package-naming/package-naming.module.code.ts"
import { statedIn } from "../../../../modules/page-literal/page-literal.module.code.ts"
import { reach, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const RENAME_PAGE_SLUG = "change-mechanical-file-content/rename-page-slug"

const MOVE_FILE_CODE = "change-mechanical/move-file-code"

const MOVE_FILE = "change-mechanical-file/move-file"

const CODE = new Set([".ts", ".tsx"])

const RENAME_EXPORT = "change-mechanical-file-content/rename-export"

const RENAME_PAGE_ADDRESS = "change-mechanical-file-content/rename-page-address"

const TYPED = ".ts"

const SLUG = "slug"

const PAGE_TYPE_KEY = "type"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const PAGE_TYPE = "page-type"

const PLURAL_SLUG = "pluralSlug"

export type Asked = {
  readonly at: string
  readonly to: string
  readonly plural?: string
  readonly addressesRestated?: boolean
}

type Held = {
  readonly slug: string
  readonly pageTypeSlug: string
  readonly said: ReadonlyMap<string, string>
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
      pageTypeSlug: pageTypeSlug.text,
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
    const propertySlug = slugFor(key)
    if (heldIn(world, held, propertySlug) !== null) continue
    found.push((path) => besideAt(path, propertySlug, ending))
  }
  return found
}

function reservedIn(world: World, held: Held, at: string): readonly Beside[] {
  const said = world.index.sidecarsAt().get(held.pageTypeSlug)
  if (said === undefined) return []
  const found: Beside[] = []
  if (said.secret) found.push(secretAt)
  if (said.uncommitted) found.push(uncommittedAt)
  return found.filter((named) => {
    const path = named(at)
    return path !== null && world.textOf(path) !== null
  })
}

function movesOver(beside: readonly Beside[], at: string, to: string): readonly Move[] {
  const found: Move[] = []
  for (const named of beside) {
    const from = named(at)
    const next = named(to)
    if (from === null || next === null) continue
    found.push({ from, to: next })
  }
  return found.sort((one, two) => (one.from < two.from ? -1 : one.from > two.from ? 1 : 0))
}

function underIn(
  world: World,
  from: string,
  to: string,
  moved: ReadonlySet<string>
): readonly Move[] {
  const found: Move[] = []
  for (const path of world.under(from)) {
    if (moved.has(path)) continue
    found.push({ from: path, to: join(to, relative(from, path)) })
  }
  return found.sort((one, two) => (one.from < two.from ? -1 : one.from > two.from ? 1 : 0))
}

function pluralIn(world: World, held: Held): string {
  const at = world.index.listedAt(PAGE_TYPE, held.pageTypeSlug)[0]?.path
  if (at === undefined) return ""
  const text = world.textOf(at)
  if (text === null) return ""
  const read = readIn(at, text)
  return "refused" in read ? "" : (read.held.said.get(PLURAL_SLUG) ?? "")
}

function ownsIn(world: World, held: Held, at: string, beside: readonly Beside[]): boolean {
  if (beside.length === 0) return false
  const opening = `${held.slug}.${held.pageTypeSlug}.`
  const files = world.index.filesIn(dirname(at))
  return files.length > 0 && files.every((one) => basename(one).startsWith(opening))
}

function foldedAs(world: World, held: Held, given: Asked, folder: string): string {
  if (held.pageTypeSlug !== PAGE_TYPE) {
    return folderFor(pluralIn(world, held), held.pageTypeSlug, given.to)
  }
  const named = basename(folder)
  if (given.plural === undefined || namedForThePlural(named, given.plural)) return named
  return given.plural
}

function landingIn(world: World, held: Held, given: Asked, beside: readonly Beside[]): string {
  const name = `${given.to}.${held.pageTypeSlug}${TYPED}`
  const folder = dirname(given.at)
  if (!ownsIn(world, held, given.at, beside)) return join(folder, name)
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
  for (const at of manifestsIn(world.index.everyPath(), world.index.fileKeysAt())) {
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

function typedIn(at: string, text: string, named: string): boolean {
  for (const one of parsedAs(at, text).statements) {
    if (!ts.isTypeAliasDeclaration(one) && !ts.isInterfaceDeclaration(one)) continue
    if (one.name.text !== named) continue
    const shown = one.modifiers ?? []
    if (shown.some((each) => each.kind === ts.SyntaxKind.ExportKeyword)) return true
  }
  return false
}

async function typeAnew(world: World, at: string, was: string, to: string): Promise<Answer | null> {
  const text = world.textOf(at)
  if (text === null) return null
  const named = typedAs(was)
  if (!typedIn(at, text, named)) return null
  const reading = importingOf(world.index, new Map([[at, at]]))
  if ("unread" in reading) return refusing(reading.unread)
  const spelled = await reach(world, RENAME_EXPORT, {
    at,
    over: [at, ...reading.importers],
    of: named,
    to: typedAs(to),
  })
  return spelled.said
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const read = readIn(given.at, text)
  if ("refused" in read) return refusing(read.refused)
  const held = read.held
  let lands: string
  let beside: readonly Beside[]
  try {
    beside = [...besideIn(world, held), ...reservedIn(world, held, given.at)]
    lands = landingIn(world, held, given, beside)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${why}, so no file was moved`)
  }
  const answers: Answer[] = []
  let folded = stating([])
  let seen = world
  if (given.to === held.slug) {
    const carries = `\`${given.to}\` is the slug this page carries`
    if (given.plural !== undefined) return refusing(`${carries}, so no plural is restated`)
    if (lands === given.at) return refusing(`${carries}, in the folder that slug names`)
  }
  const moves: Move[] = [{ from: given.at, to: lands }, ...movesOver(beside, given.at, lands)]
  const wasFolder = dirname(given.at)
  const nowFolder = dirname(lands)
  if (nowFolder !== wasFolder) {
    moves.push(...underIn(world, wasFolder, nowFolder, new Set(moves.map((one) => one.from))))
  }
  const way = wayIn(world, new Map(moves.map((one) => [one.from, one.to])), held.slug, given.to)
  if (given.to !== held.slug && given.addressesRestated !== true) {
    const addressed = await reach(seen, RENAME_PAGE_ADDRESS, {
      was: `${held.pageTypeSlug}/${held.slug}`,
      now: `${held.pageTypeSlug}/${given.to}`,
    })
    if (addressed.said.refused !== null) return addressed.said
    answers.push(addressed.said)
    folded = gathered(answers)
    if (folded.refused !== null) return folded
    seen = addressed.world
  }
  for (const one of moves) {
    const named = CODE.has(extname(one.from)) ? MOVE_FILE_CODE : MOVE_FILE
    const moved = await reach(seen, named, one)
    if (moved.said.refused !== null) return moved.said
    answers.push(moved.said)
    folded = gathered(answers)
    if (folded.refused !== null) return folded
    seen = moved.world
  }
  if (given.to !== held.slug) {
    const said = await reach(seen, RENAME_PAGE_SLUG, {
      at: lands,
      to: given.to,
      plural: given.plural,
    })
    if (said.said.refused !== null) return said.said
    answers.push(said.said)
    folded = gathered(answers)
    if (folded.refused !== null) return folded
    seen = said.world
    const spelled = await typeAnew(seen, lands, held.slug, given.to)
    if (spelled !== null) {
      if (spelled.refused !== null) return spelled
      answers.push(spelled)
      folded = gathered(answers)
      if (folded.refused !== null) return folded
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
