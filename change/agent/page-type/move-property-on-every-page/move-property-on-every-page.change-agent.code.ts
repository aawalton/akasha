import { refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Asked,
  askedIn,
  type ValueCarryingAsked,
  valueCarryingTakes,
} from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"

const MOVE_PROPERTY = "change-mechanical-page-type/move-property-on-every-page"

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
