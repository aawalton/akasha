import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { removePropertyFromEveryPage as removePropertyFromEveryPageMechanical } from "akasha/change/mechanical/page-type/remove/remove-property-from-every-page/remove-property-from-every-page.change-mechanical-page-type.ts"
import { type Answer, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type KeyHoldingAsked,
  keyAskedIn,
  keyHoldingTakes,
} from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"

const REMOVE_PROPERTY =
  `${changeMechanicalPageType.slug}/${removePropertyFromEveryPageMechanical.slug}` as const

export async function removePropertyFromEveryPage(
  world: World,
  given: KeyHoldingAsked
): Promise<Answer> {
  return (await reach(world, REMOVE_PROPERTY, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = keyHoldingTakes

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const asked = keyAskedIn(given)
  if (typeof asked === "string") return refusing(asked)
  return await removePropertyFromEveryPage(world, asked)
}
