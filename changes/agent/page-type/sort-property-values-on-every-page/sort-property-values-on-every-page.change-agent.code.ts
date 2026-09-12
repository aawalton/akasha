import { refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  type KeyHoldingAsked,
  keyAskedIn,
  keyHoldingTakes,
} from "akasha/changes/modules/value-carrying/value-carrying.module.code.ts"

const SORT_PROPERTY_VALUES = "change-mechanical-page-type/sort-property-values-on-every-page"

export async function sortPropertyValuesOnEveryPage(
  world: World,
  given: KeyHoldingAsked
): Promise<Answer> {
  return (await reach(world, SORT_PROPERTY_VALUES, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = keyHoldingTakes

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const asked = keyAskedIn(given)
  if (typeof asked === "string") return refusing(asked)
  return await sortPropertyValuesOnEveryPage(world, asked)
}
