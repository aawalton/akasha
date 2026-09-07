import type { Named } from "@akasha/indexes"
import { partedIn } from "@akasha/pages/page-file-name"
import {
  answered,
  gathered,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { claimedIn } from "../../../modules/page-claiming/page-claiming.module.code.ts"
import { pageIn } from "../../../modules/page-knowing/page-knowing.module.code.ts"

const PART_SLUGS = "part-slugs"

const PART_SLUGS_KEY = "partSlugs"

const REMOVE_FILE = "change-mechanical/remove-file"

const REMOVE_PROPERTY_VALUE = "change-mechanical/remove-property-value"

export type RemoveOrdinaryPageAsked = {
  readonly at: string
}

export function parentsOf(world: World, at: string): readonly Named[] {
  const found: Named[] = []
  for (const one of world.index.listedByPath(at)) {
    for (const namer of world.index.namersOf(one.id)) {
      if (namer.propertySlug === PART_SLUGS) found.push(namer)
    }
  }
  return found
}

async function unnamingIn(world: World, at: string, parents: readonly Named[]): Promise<Answer> {
  const said = partedIn(at)
  if (said === null) return answered([])
  const qualified = `${said.pageType}/${said.slug}`
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
      value: said.slug,
    })
    if (bare.said.refused !== null) return one.said
    answers.push(bare.said)
    seen = bare.world
  }
  return gathered(answers)
}

export async function removePage(world: World, given: RemoveOrdinaryPageAsked): Promise<Answer> {
  let beside: readonly string[]
  try {
    const value = pageIn(world, given.at)
    if (value === null) return refusing(`\`${given.at}\` names no page, so no page is taken away`)
    beside = claimedIn(world, given.at, value)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return refusing(`${why}, so the files beside \`${given.at}\` were not worked out`)
  }
  const parents = parentsOf(world, given.at)
  const taken: Answer[] = []
  let seen = world
  for (const one of beside) {
    const said = await reach(seen, REMOVE_FILE, { at: one })
    taken.push(said.said)
    seen = said.world
  }
  const unnamed = await unnamingIn(seen, given.at, parents)
  if (unnamed.refused !== null) return unnamed
  return gathered([...taken, unnamed])
}

export async function runChange(world: World, given: RemoveOrdinaryPageAsked): Promise<Answer> {
  return await removePage(world, given)
}
