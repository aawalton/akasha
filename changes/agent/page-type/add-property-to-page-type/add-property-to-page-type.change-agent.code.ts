import { missing, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const ADD_PROPERTY_TO_PAGE_TYPE = "change-mechanical-page-type/add-property-to-page-type"

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
