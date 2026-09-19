import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { sortPropertyValuesOnEveryPage as sortPropertyValuesOnEveryPageMechanical } from "akasha/change/mechanical/page-type/move/sort-property-values-on-every-page/sort-property-values-on-every-page.change-mechanical-page-type.ts"
import { type Answer, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  KEY_HOLDING_TAKES,
  type KeyHoldingAsked,
  keyAskedIn,
} from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"

const SORT_PROPERTY_VALUES =
  `${changeMechanicalPageType.slug}/${sortPropertyValuesOnEveryPageMechanical.slug}` as const

export async function sortPropertyValuesOnEveryPage(
  world: World,
  given: KeyHoldingAsked
): Promise<Answer> {
  return (await reach(world, SORT_PROPERTY_VALUES, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = KEY_HOLDING_TAKES

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const asked = keyAskedIn(given)
  if (typeof asked === "string") return refusing(asked)
  return await sortPropertyValuesOnEveryPage(world, asked)
}
