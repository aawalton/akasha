import {
  type FileChange,
  type Splice,
  splicedIn,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  carriedUnder,
  entriesBeside,
} from "akasha/change/modules/page-property-carrying/page-property-carrying.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { ENTRY_PROPERTY } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import type { Carried as Declared } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

export type EntryAsked = {
  readonly pageType: string
  readonly key: string
  readonly atMost?: number | null
}

type Spotting = (at: string, text: string) => readonly Splice[] | string

function shapeOf(world: World, given: EntryAsked): Declared | string {
  const carried = world.index.propertiesIfNamed(given.pageType)
  if (carried === null) return `\`${given.pageType}\` names no page type`
  const held = carried.find((one) => one.key === given.key)
  if (held === undefined) return `a \`${given.pageType}\` has no property under \`${given.key}\``
  if (!world.index.kindsUnder(ENTRY_PROPERTY).has(held.pageTypeSlug)) {
    return `\`${given.key}\` on a \`${given.pageType}\` keeps no entries beside the page`
  }
  return held
}

function pageWritten(
  world: World,
  files: readonly string[],
  spotting: Spotting
): readonly FileChange[] | string {
  const made: FileChange[] = []
  for (const at of files) {
    const text = world.textOf(at)
    if (text === null) return `\`${at}\` could not be read`
    const spots = spotting(at, text)
    if (typeof spots === "string") return spots
    made.push(...splicedIn(at, text, spots))
  }
  return made
}

export function entriesRewritten(
  world: World,
  given: EntryAsked,
  spotting: Spotting
): readonly FileChange[] | string {
  const shape = shapeOf(world, given)
  if (typeof shape === "string") return shape
  const atMost = given.atMost ?? null
  const edits: FileChange[] = []
  let pages = 0
  for (const one of carriedUnder(world, [given.pageType], given.key, null)) {
    if (atMost !== null && pages >= atMost) break
    const files = entriesBeside(world, one.path, one.held, shape.propertySlug, shape.uncommitted)
    const made = pageWritten(world, files, spotting)
    if (typeof made === "string") return made
    if (made.length > 0) pages = pages + 1
    edits.push(...made)
  }
  return edits
}
