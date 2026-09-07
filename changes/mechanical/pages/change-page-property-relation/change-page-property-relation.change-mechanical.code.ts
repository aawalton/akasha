import { eachTarget, reaches, type Shaped } from "@akasha/indexes/reaching"
import { partedIn } from "@akasha/pages/page-file-name"
import type { Value } from "@akasha/pages/page-value"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const CHANGE_PAGE_PROPERTY = "change-mechanical/change-page-property"

export type ChangePagePropertyRelationAsked = {
  readonly at: string
  readonly key: string
  readonly to: string
}

export function pageIn(world: World, at: string): Value | null {
  const said = partedIn(at)
  if (said === null || said.sections.length > 0) return null
  return world.index.pageAt(said.pageType, said.slug)
}

export function targetsIn(known: Shaped, value: Value, key: string): readonly string[] {
  const slug = known.slugOfKeyIn(value, key)
  return slug === null ? [] : eachTarget(known.targetOf(slug))
}

export type Read = { readonly known: Shaped; readonly value: Value } | { readonly refused: string }

export function readFor(world: World, at: string): Read {
  let known: Shaped
  let value: Value | null
  try {
    known = world.index.knownIn()
    value = pageIn(world, at)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return { refused: `${why}, so \`${at}\` was not read` }
  }
  if (value === null) return { refused: `\`${at}\` names no page` }
  return { known, value }
}

export async function changePagePropertyRelation(
  world: World,
  given: ChangePagePropertyRelationAsked
): Promise<Answer> {
  const read = readFor(world, given.at)
  if ("refused" in read) return refusing(`${read.refused}, so no relation is stated`)
  const targets = targetsIn(read.known, read.value, given.key)
  if (targets.length === 0) return refusing(`\`${given.key}\` names no relation on \`${given.at}\``)
  const reached = reaches(given.to, targets, read.known)
  if ("refused" in reached) {
    return refusing(`\`${given.key}\` names a relation, and ${reached.refused}`)
  }
  return await reach(world, CHANGE_PAGE_PROPERTY, given)
}

export async function runChange(
  world: World,
  given: ChangePagePropertyRelationAsked
): Promise<Answer> {
  return await changePagePropertyRelation(world, given)
}
