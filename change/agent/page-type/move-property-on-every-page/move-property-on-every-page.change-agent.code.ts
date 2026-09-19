import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { movePropertyOnEveryPage as movePropertyOnEveryPageMechanical } from "akasha/change/mechanical/page-type/move/move-property-on-every-page/move-property-on-every-page.change-mechanical-page-type.ts"
import { refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Asked,
  askedIn,
  type ValueCarryingAsked,
  valueCarryingTakes,
} from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"

const MOVE_PROPERTY =
  `${changeMechanicalPageType.slug}/${movePropertyOnEveryPageMechanical.slug}` as const

export async function movePropertyOnEveryPage(
  world: World,
  given: ValueCarryingAsked
): Promise<Answer> {
  return (await reach(world, MOVE_PROPERTY, given)).said
}

export const takes: readonly string[] = valueCarryingTakes

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const asked = askedIn(given)
  if (typeof asked === "string") return refusing(asked)
  return await movePropertyOnEveryPage(world, asked)
}
