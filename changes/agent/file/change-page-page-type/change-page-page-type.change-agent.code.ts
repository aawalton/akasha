import { missing, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const CHANGE_PAGE_PAGE_TYPE = "change-mechanical/change-page-page-type"

const AT = "at"

const TO = "to"

export type ChangePagePageTypeAsked = {
  readonly at: string
  readonly to: string
}

export async function changePagePageType(
  world: World,
  given: ChangePagePageTypeAsked
): Promise<Answer> {
  return (await reach(world, CHANGE_PAGE_PAGE_TYPE, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, TO]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await changePagePageType(world, { at, to })
}
