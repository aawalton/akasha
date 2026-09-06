import { basename, dirname, join } from "node:path"
import { parsedAs } from "@akasha/code/code-source"
import { filesIn, listedAt, schemaOf } from "@akasha/indexes"
import { besideAt } from "@akasha/pages/page-file-name"
import { slugFor } from "@akasha/pages/page-property-key"
import { folderFor } from "../../../pages/service/page-composing/page-composing.module.code.ts"
import { renameSlug } from "../rename-page-slug/rename-page-slug.change.code.ts"
import { renamePath } from "../rename-path/rename-path.change.code.ts"
import { statedIn } from "../restate-value/restate-value.change.code.ts"

const TYPED = ".ts"

const SLUG = "slug"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const PAGE_TYPE = "page-type"

const FILE_PROPERTY = "file-property"

const PLURAL_SLUG = "pluralSlug"

export type Asked = {
  readonly at: string
  readonly to: string
  readonly plural?: string
}

export type Renamed = {
  readonly moved: ReadonlyMap<string, string> | null
  readonly bodies: ReadonlyMap<string, string> | null
  readonly refused: string | null
}

type Held = {
  readonly slug: string
  readonly pageTypeSlug: string
  readonly said: ReadonlyMap<string, string>
}

type Read = { readonly held: Held } | { readonly refused: string }

type Move = { readonly from: string; readonly to: string }

function refusing(why: string): Renamed {
  return { moved: null, bodies: null, refused: why }
}

function readingOver(
  held: ReadonlyMap<string, string>,
  textOf: (path: string) => string | null
): (path: string) => string | null {
  return (path) => held.get(path) ?? textOf(path)
}

function readIn(at: string, text: string): Read {
  const source = parsedAs(at, text)
  const said = statedIn(source)
  const slug = said.get(SLUG)
  const pageTypeSlug = said.get(PAGE_TYPE_SLUG)
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

type Beside = { readonly propertySlug: string; readonly ending: string }

function besideIn(root: string, held: Held): readonly Beside[] {
  const found: Beside[] = []
  for (const [key, ending] of held.said) {
    const answer = schemaOf(root, slugFor(key))
    if ("refused" in answer) continue
    const one = answer.schema
    if (one.pageTypeSlug !== FILE_PROPERTY) continue
    const propertySlug = one.propertySlug
    if (propertySlug === null) continue
    found.push({ propertySlug, ending })
  }
  return found
}

function movesOver(beside: readonly Beside[], at: string, to: string): readonly Move[] {
  const found: Move[] = []
  for (const one of beside) {
    const from = besideAt(at, one.propertySlug, one.ending)
    const next = besideAt(to, one.propertySlug, one.ending)
    if (from === null || next === null) continue
    found.push({ from, to: next })
  }
  return found.sort((one, two) => (one.from < two.from ? -1 : one.from > two.from ? 1 : 0))
}

function pluralIn(root: string, held: Held, textOf: (path: string) => string | null): string {
  const at = listedAt(root, PAGE_TYPE, held.pageTypeSlug)[0]?.path
  if (at === undefined) return ""
  const text = textOf(at)
  if (text === null) return ""
  const read = readIn(at, text)
  return "refused" in read ? "" : (read.held.said.get(PLURAL_SLUG) ?? "")
}

function ownsIn(root: string, held: Held, at: string, beside: readonly Beside[]): boolean {
  if (beside.length === 0) return false
  const opening = `${held.slug}.${held.pageTypeSlug}.`
  const files = filesIn(root, dirname(at))
  return files.length > 0 && files.every((one) => basename(one).startsWith(opening))
}

function landingIn(
  root: string,
  held: Held,
  given: Asked,
  beside: readonly Beside[],
  textOf: (path: string) => string | null
): string {
  const name = `${given.to}.${held.pageTypeSlug}${TYPED}`
  const folder = dirname(given.at)
  if (!ownsIn(root, held, given.at, beside)) return join(folder, name)
  return join(
    dirname(folder),
    folderFor(pluralIn(root, held, textOf), held.pageTypeSlug, given.to),
    name
  )
}

export function renamePage(
  root: string,
  given: Asked,
  textOf: (path: string) => string | null
): Renamed {
  const text = textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const read = readIn(given.at, text)
  if ("refused" in read) return refusing(read.refused)
  const held = read.held
  if (held.pageTypeSlug === PAGE_TYPE) {
    return refusing(`\`${given.at}\` names a page type, whose slug is renamed by another act`)
  }
  const bodies = new Map<string, string>()
  const over = readingOver(bodies, textOf)
  let lands: string
  let beside: readonly Beside[]
  try {
    beside = besideIn(root, held)
    lands = landingIn(root, held, given, beside, over)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${why}, so no file was carried`)
  }
  if (given.to === held.slug) {
    const carries = `\`${given.to}\` is the slug this page carries`
    if (given.plural !== undefined) return refusing(`${carries}, so no plural is restated`)
    if (lands === given.at) return refusing(`${carries}, in the folder that slug names`)
  } else {
    const said = renameSlug(root, { at: given.at, to: given.to, plural: given.plural }, over)
    if (said.bodies === null) return refusing(said.refused ?? `\`${held.slug}\` was not renamed`)
    for (const [path, body] of said.bodies) bodies.set(path, body)
  }
  const moved = new Map<string, string>()
  for (const one of [{ from: given.at, to: lands }, ...movesOver(beside, given.at, lands)]) {
    const carried = renamePath(root, one, over)
    if (carried.bodies === null || carried.moved === null) {
      return refusing(carried.refused ?? `\`${one.from}\` was not carried`)
    }
    for (const [path, body] of carried.bodies) bodies.set(path, body)
    bodies.delete(carried.moved.from)
    moved.set(carried.moved.from, carried.moved.to)
  }
  return { moved, bodies, refused: null }
}
