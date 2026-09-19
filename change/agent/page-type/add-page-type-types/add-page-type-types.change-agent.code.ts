import { addPageTypeTypes as addPageTypeTypesMechanical } from "akasha/change/mechanical/page-type/add/add-page-type-types/add-page-type-types.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { missing, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const ADD_PAGE_TYPE_TYPES =
  `${changeMechanicalPageType.slug}/${addPageTypeTypesMechanical.slug}` as const

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
