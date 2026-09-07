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

function parentsOf(world: World, at: string): readonly Named[] {
  const found: Named[] = []
  for (const one of world.index.listedByPath(at)) {
    for (const namer of world.index.namersOf(one.id)) {
      if (namer.propertySlug === PART_SLUGS) found.push(namer)
    }
  }
  return found
}

async function unnamingIn(world: World, slug: string, parents: readonly Named[]): Promise<Answer> {
  const qualified = `${PAGE_TYPE}/${slug}`
  const answers: Answer[] = []
  let seen = world
  for (const parent of parents) {
    const one = await reach(seen, REMOVE_PROPERTY_VALUE, {
      at: parent.path,
      key: PART_SLUGS_KEY,
      value: qualified,
    })
    if (one.said.refused === null) {
      answers.push(one.said)
      seen = one.world
      continue
    }
    const bare = await reach(seen, REMOVE_PROPERTY_VALUE, {
      at: parent.path,
      key: PART_SLUGS_KEY,
      value: slug,
    })
    if (bare.said.refused !== null) return one.said
    answers.push(bare.said)
    seen = bare.world
  }
  return gathered(answers)
}

export async function removePageType(world: World, given: RemovePageTypeAsked): Promise<Answer> {
  const nowhere = `\`${given.at}\` names no page type, so no page type is taken away`
  const said = partedIn(given.at)
  if (said === null) return refusing(nowhere)
  let beside: readonly string[]
  try {
    const value = typeIn(world, given.at)
    if (value === null) return refusing(nowhere)
    beside = claimedIn(world, given.at, value)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${why}, so \`${given.at}\` was not taken away`)
  }
  const parents = parentsOf(world, given.at)
  const taken: Answer[] = []
  let seen = world
  for (const one of beside) {
    const answer = await reach(seen, REMOVE_FILE, { at: one })
    taken.push(answer.said)
    seen = answer.world
  }
  const unnamed = await unnamingIn(seen, said.slug, parents)
  if (unnamed.refused !== null) return unnamed
  return gathered([...taken, unnamed])
}

export async function runChange(world: World, given: RemovePageTypeAsked): Promise<Answer> {
  return await removePageType(world, given)
}
