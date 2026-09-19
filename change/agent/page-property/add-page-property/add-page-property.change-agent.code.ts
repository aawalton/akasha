import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addPageProperty as addPagePropertyMechanical } from "akasha/change/mechanical/page-property/add-page-property/add-page-property.change-mechanical.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const ADD_PAGE_PROPERTY = `${changeMechanical.slug}/${addPagePropertyMechanical.slug}` as const

const AT = "at"

const BODY = "body"

const PART_OF = "part-of"

const ON = "on"

const REQUIRED = "required"

const MANY = "many"

const DEFAULT = "default"

const TRUE = "true"

const NO_TYPE = "`on` names no page type, so nothing would declare the property"

export type AddPagePropertyAsked = {
  readonly at: string
  readonly body: string
  readonly partOf: string
  readonly on: readonly string[]
  readonly required: boolean
  readonly many: boolean
  readonly default?: string
}

export async function addPageProperty(world: World, given: AddPagePropertyAsked): Promise<Answer> {
  return (await reach(world, ADD_PAGE_PROPERTY, given)).said
}

function namedIn(said: string): readonly string[] {
  const found: string[] = []
  for (const line of said.split("\n")) {
    const one = line.trim()
    if (one !== "") found.push(one)
  }
  return found
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, BODY, PART_OF, ON, REQUIRED, MANY, DEFAULT]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const body = given[BODY]
  if (body === undefined) return refusing(missing(BODY))
  const partOf = given[PART_OF]
  if (partOf === undefined) return refusing(missing(PART_OF))
  const on = given[ON]
  if (on === undefined) return refusing(missing(ON))
  const required = given[REQUIRED]
  if (required === undefined) return refusing(missing(REQUIRED))
  const many = given[MANY]
  if (many === undefined) return refusing(missing(MANY))
  const named = namedIn(on)
  if (named.length === 0) return refusing(NO_TYPE)
  const held = given[DEFAULT]
  return await addPageProperty(world, {
    at,
    body,
    partOf,
    on: named,
    required: required === TRUE,
    many: many === TRUE,
    ...(held === undefined ? {} : { default: held }),
  })
}
