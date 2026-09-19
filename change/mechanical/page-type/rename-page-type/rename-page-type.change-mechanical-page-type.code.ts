import {
  pathsSpelling,
  restatedOver,
} from "akasha/change/modules/address-restating/address-restating.module.code.ts"
import {
  type Answer,
  type FileChange,
  gathered,
  pathsIn,
  refusing,
  type Splice,
  splicedIn,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { exportRenamed } from "akasha/change/modules/export-renaming/export-renaming.module.code.ts"
import { carriedBy } from "akasha/change/modules/file-carrying/file-carrying.module.code.ts"
import { statedIn } from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import type { Paged } from "akasha/change/modules/page-type-renaming/page-type-renaming.module.code.ts"
import {
  keyedAnew,
  pagesMoved,
  typeMoved,
} from "akasha/change/modules/page-type-renaming/page-type-renaming.module.code.ts"
import { type World, worldOver } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { placingOver } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { importingOf } from "akasha/page/index/modules/path-naming/path-naming.module.code.ts"
import { spellingsIn } from "akasha/page/modules/export-name/modules/export-spelling/export-spelling.module.code.ts"
import {
  exportedAs,
  typedAs,
} from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import {
  besideAt,
  partedIn,
  typeSlugIn,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const PAGE_TYPE = "page-type"

const WORKED = "worked"

const TYPES = "types"

const HOLDS = "ts"

const WORKED_NAME = "Worked"

const SLUG = "slug"

export type Asked = {
  readonly at: string
  readonly to: string
}

type Spelling = { readonly at: string; readonly of: string; readonly to: string }

type Read = {
  readonly moved: ReadonlyMap<string, string>
  readonly paged: readonly Paged[]
  readonly lands: string
  readonly addresses: ReadonlyMap<string, string>
}

function movesIn(world: World, given: Asked, was: string): Read | string {
  const pages = pagesMoved(world, was, given.to)
  if ("refused" in pages) return pages.refused
  const own = typeMoved(world, given.at, given.to)
  if ("refused" in own) return own.refused
  const addresses = new Map([[`${PAGE_TYPE}/${was}`, `${PAGE_TYPE}/${given.to}`]])
  for (const one of pages.paged) {
    const said = partedIn(one.at)
    if (said === null) return `\`${one.at}\` reads as no page file`
    addresses.set(`${was}/${said.slug}`, `${given.to}/${said.slug}`)
  }
  return {
    moved: new Map([...pages.moved, ...own.moved]),
    paged: pages.paged,
    lands: own.paged[0]?.lands ?? given.at,
    addresses,
  }
}

function ownAnew(world: World, given: Asked, lands: string): readonly FileChange[] | string {
  const text = world.textOf(given.at)
  if (text === null) return `\`${given.at}\` could not be read`
  const source = parsedAs(given.at, text)
  const said = statedIn(source)
  const slug = said.get(SLUG)
  if (slug === undefined) return `\`${given.at}\` states no \`${SLUG}\``
  const spots: Splice[] = [
    { from: slug.getStart(source), to: slug.getEnd(), put: JSON.stringify(given.to) },
  ]
  return splicedIn(lands, text, spots)
}

function besideIn(world: World, lands: string, section: string): string | null {
  const at = besideAt(lands, section, HOLDS)
  return at === null || world.textOf(at) === null ? null : at
}

function spellingsFor(world: World, lands: string, was: string, to: string): readonly Spelling[] {
  const text = world.textOf(lands)
  if (text === null) return []
  const said = new Map<string, string>()
  for (const [key, one] of statedIn(parsedAs(lands, text))) said.set(key, one.text)
  const found: Spelling[] = [...spellingsIn(world.textOf, lands, said, was, to)]
  found.push({ at: lands, of: exportedAs(was), to: exportedAs(to) })
  const worked = besideIn(world, lands, WORKED)
  if (worked !== null) {
    found.push({
      at: worked,
      of: `${WORKED_NAME}${typedAs(was)}`,
      to: `${WORKED_NAME}${typedAs(to)}`,
    })
  }
  const named = besideIn(world, lands, TYPES)
  if (named !== null) found.push({ at: named, of: typedAs(was), to: typedAs(to) })
  return found
}

function renamedOver(world: World, spellings: readonly Spelling[]): Answer {
  let seen = world
  const answers: Answer[] = []
  for (const one of spellings) {
    const importers = importingOf(seen.index, new Map([[one.at, one.at]]))
    const placed = placingOver(pathsIn(seen.over), seen.textOf)
    const over = [one.at, ...importers]
    const said = exportRenamed(seen.root, one.at, over, one.of, one.to, seen.textOf, placed)
    if (said.refused !== null) return said
    answers.push(said)
    seen = worldOver(seen, said)
  }
  return gathered(answers)
}

function answeredIn(world: World, given: Asked, was: string): Answer {
  const read = movesIn(world, given, was)
  if (typeof read === "string") return refusing(`${read}, so no page type is renamed`)
  const carried = carriedBy(world, read.moved)
  if (typeof carried === "string") return refusing(carried)
  const own = ownAnew(world, given, read.lands)
  if (typeof own === "string") return refusing(own)
  const edits: FileChange[] = [
    ...restatedOver(pathsSpelling(world, read.addresses), world.textOf, read.addresses),
    ...carried,
  ]
  for (const one of read.paged) {
    const text = world.textOf(one.at)
    if (text === null) continue
    edits.push(...keyedAnew(text, one.lands, was, given.to))
  }
  edits.push(...own)
  const before = stating(edits)
  const seen = worldOver(world, before)
  const spelled = renamedOver(seen, spellingsFor(seen, read.lands, was, given.to))
  if (spelled.refused !== null) return spelled
  return gathered([before, spelled])
}

export function renamePageType(world: World, given: Asked): Answer {
  const was = typeSlugIn(given.at)
  if (was === null) {
    return refusing(`\`${given.at}\` names no page type, so no page type is renamed`)
  }
  try {
    return answeredIn(world, given, was)
  } catch (cause) {
    return refusing(`${saidBy(cause)}, so no page type is renamed`)
  }
}

export function runChange(world: World, given: Asked): Promise<Answer> {
  return Promise.resolve(renamePageType(world, given))
}
