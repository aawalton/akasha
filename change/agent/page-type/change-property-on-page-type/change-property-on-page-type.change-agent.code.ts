import { missing, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const AT = "at"

const PROPERTY = "property"

const REQUIRED = "required"

const MANY = "many"

const MAX_COUNT = "max-count"

const DEFAULT = "default"

const TRUE = "true"

const PAGE_TYPE = "page-type"

const CHANGE_PROPERTY = "change-mechanical-page-type/change-property-on-page-type"

export type ChangePropertyOnPageTypeAsked = {
  readonly at: string
  readonly property: string
  readonly required: boolean
  readonly many: boolean
  readonly maxCount?: string
  readonly default?: string
}

export async function changePropertyOnPageType(
  world: World,
  given: ChangePropertyOnPageTypeAsked
): Promise<Answer> {
  const said = partedIn(given.at)
  if (said === null || said.sections.length > 0) {
    return refusing(`\`${given.at}\` reads as no page file, so no declaration is stated anew`)
  }
  if (said.pageType !== PAGE_TYPE) {
    return refusing(`\`${given.at}\` is no page type, and a declaration is written on a page type`)
  }
  return (await reach(world, CHANGE_PROPERTY, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, PROPERTY, REQUIRED, MANY, MAX_COUNT, DEFAULT]

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
  const said = given[DEFAULT]
  return await changePropertyOnPageType(world, {
    at,
    property,
    required: required === TRUE,
    many: many === TRUE,
    ...(maxCount === undefined ? {} : { maxCount }),
    ...(said === undefined ? {} : { default: said }),
  })
}
