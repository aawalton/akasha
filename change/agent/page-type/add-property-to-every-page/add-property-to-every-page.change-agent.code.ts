import { addPropertyToEveryPage as addPropertyToEveryPageMechanical } from "akasha/change/mechanical/page-type/add/add-property-to-every-page/add-property-to-every-page.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const ADD_PROPERTY =
  `${changeMechanicalPageType.slug}/${addPropertyToEveryPageMechanical.slug}` as const

const PAGE_TYPE = "page-type"

const KEY = "key"

const VALUE = "value"

const AFTER = "after"

export type AddPropertyToEveryPageAsked = {
  readonly pageType: string
  readonly key: string
  readonly value: string
  readonly after?: string
}

export async function addPropertyToEveryPage(
  world: World,
  given: AddPropertyToEveryPageAsked
): Promise<Answer> {
  return (await reach(world, ADD_PROPERTY, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [PAGE_TYPE, KEY, VALUE, AFTER]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return refusing(missing(PAGE_TYPE))
  const key = given[KEY]
  if (key === undefined) return refusing(missing(KEY))
  const value = given[VALUE]
  if (value === undefined) return refusing(missing(VALUE))
  const after = given[AFTER]
  return await addPropertyToEveryPage(
    world,
    after === undefined ? { pageType, key, value } : { pageType, key, value, after }
  )
}
