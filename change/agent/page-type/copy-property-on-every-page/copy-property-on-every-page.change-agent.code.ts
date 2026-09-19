import { copyPropertyOnEveryPage as copyPropertyOnEveryPageMechanical } from "akasha/change/mechanical/page-type/add/copy-property-on-every-page/copy-property-on-every-page.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Asked,
  askedIn,
  type ValueCarryingAsked,
  valueCarryingTakes,
} from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"

const COPY_PROPERTY =
  `${changeMechanicalPageType.slug}/${copyPropertyOnEveryPageMechanical.slug}` as const

export async function copyPropertyOnEveryPage(
  world: World,
  given: ValueCarryingAsked
): Promise<Answer> {
  return (await reach(world, COPY_PROPERTY, given)).said
}

export const takes: readonly string[] = valueCarryingTakes

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const asked = askedIn(given)
  if (typeof asked === "string") return refusing(asked)
  return await copyPropertyOnEveryPage(world, asked)
}
