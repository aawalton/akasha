import { basename, dirname, join } from "node:path"
import { parsedAs } from "@akasha/code/code-source"
import { besideAt } from "@akasha/pages/page-file-name"
import { slugFor } from "@akasha/pages/page-property-key"
import { folderFor } from "../../../../pages/service/page-composing/page-composing.module.code.ts"
import {
  answered,
  gathered,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { type World, worldOver } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { renameSlug } from "../../../pages/rename-page-slug/rename-page-slug.change-mechanical.code.ts"
import { renamePath } from "../../../pages/rename-path/rename-path.change-mechanical.code.ts"
import { statedIn } from "../../../pages/restate-value/restate-value.change-mechanical.code.ts"

const TYPED = ".ts"

const SLUG = "slug"

const PAGE_TYPE_SLUG = "pageTypeSlug"

const PAGE_TYPE = "page-type"

const FILE_PROPERTY = "file-property"

const PLURAL_SLUG = "pluralSlug"

export type RenamePageAsked = {
  readonly at: string
  readonly to: string
  readonly plural?: string
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

function besideIn(world: World, held: Held): readonly Beside[] {
  const found: Beside[] = []
  for (const [key, ending] of held.said) {
    const answer = world.index.schemaOf(slugFor(key))
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

function landingIn(
  world: World,
  held: Held,
  given: RenamePageAsked,
  beside: readonly Beside[]
): string {
  const name = `${given.to}.${held.pageTypeSlug}${TYPED}`
  const folder = dirname(given.at)
  if (!ownsIn(world, held, given.at, beside)) return join(folder, name)
  return join(dirname(folder), folderFor(pluralIn(world, held), held.pageTypeSlug, given.to), name)
}

export function renamePage(world: World, given: RenamePageAsked): Answer {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const read = readIn(given.at, text)
  if ("refused" in read) return refusing(read.refused)
  const held = read.held
  if (held.pageTypeSlug === PAGE_TYPE) {
    return refusing(`\`${given.at}\` names a page type, whose slug is renamed by another act`)
  }
  let lands: string
  let beside: readonly Beside[]
  try {
    beside = besideIn(world, held)
    lands = landingIn(world, held, given, beside)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${why}, so no file was carried`)
  }
  const answers: Answer[] = []
  let folded = answered([])
  let seen = world
  if (given.to === held.slug) {
    const carries = `\`${given.to}\` is the slug this page carries`
    if (given.plural !== undefined) return refusing(`${carries}, so no plural is restated`)
    if (lands === given.at) return refusing(`${carries}, in the folder that slug names`)
  } else {
    const said = renameSlug(seen, { at: given.at, to: given.to, plural: given.plural })
    if (said.refused !== null) return said
    answers.push(said)
    folded = gathered(answers)
    if (folded.refused !== null) return folded
    seen = worldOver(world, folded)
  }
  for (const one of [{ from: given.at, to: lands }, ...movesOver(beside, given.at, lands)]) {
    const carried = renamePath(seen, one)
    if (carried.refused !== null) return carried
    answers.push(carried)
    folded = gathered(answers)
    if (folded.refused !== null) return folded
    seen = worldOver(world, folded)
  }
  return folded
}

export function runChange(world: World, given: RenamePageAsked): Answer {
  return renamePage(world, given)
}
