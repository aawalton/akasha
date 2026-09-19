import { addPropertyToPageType as addPropertyToPageTypeMechanical } from "akasha/change/mechanical/page-type/add/add-property-to-page-type/add-property-to-page-type.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const ADD_PROPERTY_TO_PAGE_TYPE =
  `${changeMechanicalPageType.slug}/${addPropertyToPageTypeMechanical.slug}` as const

const AT = "at"

const PROPERTY = "property"

const REQUIRED = "required"

const MANY = "many"

const MAX_COUNT = "max-count"

const TRUE = "true"

export type AddPropertyToPageTypeAsked = {
  readonly at: string
  readonly property: string
  readonly required: boolean
  readonly many: boolean
  readonly maxCount?: string
}

export async function addPropertyToPageType(
  world: World,
  given: AddPropertyToPageTypeAsked
): Promise<Answer> {
  return (await reach(world, ADD_PROPERTY_TO_PAGE_TYPE, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, PROPERTY, REQUIRED, MANY, MAX_COUNT]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const property = given[PROPERTY]
  if (property === undefined) return refusing(missing(PROPERTY))
  const required = given[REQUIRED]
  if (required === undefined) return refusing(missing(REQUIRED))
  const many = given[MANY]
  if (many === undefined) return refusing(missing(MANY))
  const maxCount = given[MAX_COUNT]
  return await addPropertyToPageType(world, {
    at,
    property,
    required: required === TRUE,
    many: many === TRUE,
    ...(maxCount === undefined ? {} : { maxCount }),
  })
}
