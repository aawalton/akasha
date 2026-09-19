import { addPagePropertyTypes as addPagePropertyTypesMechanical } from "akasha/change/mechanical/page-type/add/add-page-property-types/add-page-property-types.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const ADD_TYPES = `${changeMechanicalPageType.slug}/${addPagePropertyTypesMechanical.slug}` as const

const PAGE_TYPE = "page-type"

const UNDER = "under"

export type AddPagePropertyTypesAsked = {
  readonly pageType: string
  readonly under?: string
}

export async function addPagePropertyTypes(
  world: World,
  given: AddPagePropertyTypesAsked
): Promise<Answer> {
  return (await reach(world, ADD_TYPES, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [PAGE_TYPE, UNDER]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return refusing(missing(PAGE_TYPE))
  const under = given[UNDER]
  return await addPagePropertyTypes(world, under === undefined ? { pageType } : { pageType, under })
}
