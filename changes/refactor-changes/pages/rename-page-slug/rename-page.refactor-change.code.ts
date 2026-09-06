import { dirname, join } from "node:path"
import { parsedAs } from "@akasha/code/code-source"
import { besideAt } from "@akasha/pages/page-file-name"
import { slugFor } from "@akasha/pages/page-property-key"
import { propertiesIfNamedOf } from "@akasha/pages/page-type-properties"
import { valueAt } from "@akasha/pages/page-value"
import { renamePath } from "../../../atomic-changes/pages/rename-path/rename-path.atomic-change.code.ts"
import { renameSlug } from "../../../atomic-changes/pages/rename-slug/rename-slug.atomic-change.code.ts"
import { statedIn } from "../../../partial/pages/restate-value/restate-value.change-partial.code.ts"

const TYPED = ".ts"

const SLUG = "slug"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const PAGE_TYPE = "page-type"

const FILE_PROPERTY = "file-property"

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

function besideIn(root: string, held: Held, at: string, to: string): readonly Move[] {
  const found: Move[] = []
  const declared = propertiesIfNamedOf(held.pageTypeSlug, root, (path) => valueAt(path, root)) ?? []
  const under = new Map(declared.map((one) => [one.propertySlug, one]))
  for (const [key, ending] of held.said) {
    const one = under.get(slugFor(key))
    if (one === undefined) continue
    if (one.pageTypeSlug !== FILE_PROPERTY) continue
    const propertySlug = one.propertySlug
    const from = besideAt(at, propertySlug, ending)
    const next = besideAt(to, propertySlug, ending)
    if (from === null || next === null) continue
    found.push({ from, to: next })
  }
  return found.sort((one, two) => (one.from < two.from ? -1 : one.from > two.from ? 1 : 0))
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
  const said = renameSlug(root, { at: given.at, to: given.to, plural: given.plural }, over)
  if (said.bodies === null) return refusing(said.refused ?? `\`${held.slug}\` was not renamed`)
  for (const [path, body] of said.bodies) bodies.set(path, body)
  const lands = join(dirname(given.at), `${given.to}.${held.pageTypeSlug}${TYPED}`)
  let beside: readonly Move[]
  try {
    beside = besideIn(root, held, given.at, lands)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${why}, so no file was carried`)
  }
  const moved = new Map<string, string>()
  for (const one of [{ from: given.at, to: lands }, ...beside]) {
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
