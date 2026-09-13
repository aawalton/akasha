import { missing, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const ADD_TYPES = "change-mechanical-page-type/add-page-property-types"

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
