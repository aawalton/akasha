import type { Named } from "@akasha/indexes"
import { partedIn } from "@akasha/pages/page-file-name"
import type { Value } from "@akasha/pages/page-value"
import { importNotLeftHanging } from "../../../guards/pages/import-not-left-hanging/import-not-left-hanging.change-guard.code.ts"
import { relationNotLeftHanging } from "../../../guards/pages/relation-not-left-hanging/relation-not-left-hanging.change-guard.code.ts"
import { gathered, refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { guardedBy } from "../../../modules/change-guarding/change-guarding.module.code.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { claimedIn } from "../../../modules/page-claiming/page-claiming.module.code.ts"
import { removeFile } from "../remove-file/remove-file.change-mechanical.code.ts"
import { removePropertyValue } from "../remove-property-value/remove-property-value.change-mechanical.code.ts"

const PAGE_TYPE = "page-type"

const PART_SLUGS = "part-slugs"

const PART_SLUGS_KEY = "partSlugs"

const NAMED = 5

const GUARDS = [relationNotLeftHanging, importNotLeftHanging]

export type RemovePageTypeAsked = {
  readonly at: string
}

function typeIn(world: World, at: string): Value | null {
  const said = partedIn(at)
  if (said === null || said.sections.length > 0 || said.pageType !== PAGE_TYPE) return null
  return world.index.pageAt(PAGE_TYPE, said.slug)
}

// The pages of a page type are read from the values rather than from the relations, because a
// page's own type is filed as identity, so nothing names a page type the way a parent names a part.
export function carryingIn(world: World, slug: string): readonly string[] {
  return [...world.index.everyOfType(slug).map((one) => one.path)].sort()
}

export function carrySaid(slug: string, carrying: readonly string[]): string {
  const named = carrying.slice(0, NAMED).join(", ")
  const rest = carrying.length > NAMED ? `, and ${carrying.length - NAMED} more` : ""
  return `\`${slug}\` is the page type of ${carrying.length} pages, which go first — ${named}${rest}`
}

function parentsOf(world: World, at: string): readonly Named[] {
  const found: Named[] = []
  for (const one of world.index.listedByPath(at)) {
    for (const namer of world.index.namersOf(one.id)) {
      if (namer.propertySlug === PART_SLUGS) found.push(namer)
    }
  }
  return found
}

/** A parent names the page type qualified or bare, so the bare spelling is tried where the other refuses. */
function unnamingIn(world: World, at: string, slug: string): Answer {
  const qualified = `${PAGE_TYPE}/${slug}`
  const answers: Answer[] = []
  for (const parent of parentsOf(world, at)) {
    const one = removePropertyValue(world, {
      at: parent.path,
      key: PART_SLUGS_KEY,
      value: qualified,
    })
    if (one.refused === null) {
      answers.push(one)
      continue
    }
    const bare = removePropertyValue(world, { at: parent.path, key: PART_SLUGS_KEY, value: slug })
    if (bare.refused !== null) return one
    answers.push(bare)
  }
  return gathered(answers)
}

export function removePageType(world: World, given: RemovePageTypeAsked): Answer {
  const nowhere = `\`${given.at}\` names no page type, so no page type is taken away`
  const said = partedIn(given.at)
  if (said === null) return refusing(nowhere)
  let carrying: readonly string[]
  let beside: readonly string[]
  try {
    const value = typeIn(world, given.at)
    if (value === null) return refusing(nowhere)
    carrying = carryingIn(world, said.slug)
    beside = claimedIn(world, given.at, value)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${why}, so \`${given.at}\` was not taken away`)
  }
  if (carrying.length > 0) return refusing(carrySaid(said.slug, carrying))
  const taken = beside.map((one) => removeFile({ at: one }, world.textOf))
  const unnamed = unnamingIn(world, given.at, said.slug)
  if (unnamed.refused !== null) return unnamed
  return guardedBy(world, gathered([...taken, unnamed]), GUARDS)
}

export function runChange(world: World, given: RemovePageTypeAsked): Answer {
  return removePageType(world, given)
}
