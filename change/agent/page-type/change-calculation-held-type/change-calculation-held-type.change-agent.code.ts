import { changeCalculationHeldType as changeCalculationHeldTypeMechanical } from "akasha/change/mechanical/page-type/change/change-calculation-held-type/change-calculation-held-type.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const CHANGE_HELD_TYPE =
  `${changeMechanicalPageType.slug}/${changeCalculationHeldTypeMechanical.slug}` as const

const UNDER = "under"

export type ChangeCalculationHeldTypeAsked = {
  readonly under?: string
}

export async function changeCalculationHeldType(
  world: World,
  given: ChangeCalculationHeldTypeAsked
): Promise<Answer> {
  return (await reach(world, CHANGE_HELD_TYPE, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [UNDER]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const under = given[UNDER]
  return await changeCalculationHeldType(world, under === undefined ? {} : { under })
}
