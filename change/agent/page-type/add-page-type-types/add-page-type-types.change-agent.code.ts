import { missing, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const ADD_PAGE_TYPE_TYPES = "change-mechanical-page-type/add-page-type-types"

const AT = "at"

export type AddPageTypeTypesAsked = {
  readonly at: string
}

export async function addPageTypeTypes(
  world: World,
  given: AddPageTypeTypesAsked
): Promise<Answer> {
  return (await reach(world, ADD_PAGE_TYPE_TYPES, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  return await addPageTypeTypes(world, { at })
}
