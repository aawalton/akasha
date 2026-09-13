import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const CHANGE_HELD_TYPE = "change-mechanical-page-type/change-calculation-held-type"

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
