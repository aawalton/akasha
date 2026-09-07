import type { Named } from "@akasha/indexes"
import { partedIn } from "@akasha/pages/page-file-name"
import type { Value } from "@akasha/pages/page-value"
import { gathered, refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { claimedIn } from "../../../modules/page-claiming/page-claiming.module.code.ts"

const PAGE_TYPE = "page-type"

const PART_SLUGS = "part-slugs"

const PART_SLUGS_KEY = "partSlugs"

const NAMED = 5

const REMOVE_FILE = "change-mechanical/remove-file"

const REMOVE_PROPERTY_VALUE = "change-mechanical/remove-property-value"

export type RemovePageTypeAsked = {
  readonly at: string
}

function typeIn(world: World, at: string): Value | null {
  const said = partedIn(at)
  if (said === null || said.sections.length > 0 || said.pageType !== PAGE_TYPE) return null
  return world.index.pageAt(PAGE_TYPE, said.slug)
}

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

async function unnamingIn(world: World, at: string, slug: string): Promise<Answer> {
  const qualified = `${PAGE_TYPE}/${slug}`
  const answers: Answer[] = []
  for (const parent of parentsOf(world, at)) {
    const one = await reach(world, REMOVE_PROPERTY_VALUE, {
      at: parent.path,
      key: PART_SLUGS_KEY,
      value: qualified,
    })
    if (one.refused === null) {
      answers.push(one)
      continue
    }
    const bare = await reach(world, REMOVE_PROPERTY_VALUE, {
      at: parent.path,
      key: PART_SLUGS_KEY,
      value: slug,
    })
    if (bare.refused !== null) return one
    answers.push(bare)
  }
  return gathered(answers)
}

export async function removePageType(world: World, given: RemovePageTypeAsked): Promise<Answer> {
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
  const taken: Answer[] = []
  for (const one of beside) taken.push(await reach(world, REMOVE_FILE, { at: one }))
  const unnamed = await unnamingIn(world, given.at, said.slug)
  if (unnamed.refused !== null) return unnamed
  return gathered([...taken, unnamed])
}

export async function runChange(world: World, given: RemovePageTypeAsked): Promise<Answer> {
  return await removePageType(world, given)
}
