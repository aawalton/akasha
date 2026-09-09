import { reaches } from "@akasha/indexes/reaching"
import { refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { readFor, targetsIn } from "../../../../modules/page-knowing/page-knowing.module.code.ts"

const CHANGE_PAGE_PROPERTY = "change-mechanical-file-content/change-page-page-property"

export type ChangePagePropertyRelationAsked = {
  readonly at: string
  readonly key: string
  readonly to: string
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
  return (await reach(world, CHANGE_PAGE_PROPERTY, given)).said
}

export async function runChange(
  world: World,
  given: ChangePagePropertyRelationAsked
): Promise<Answer> {
  return await changePagePropertyRelation(world, given)
}
