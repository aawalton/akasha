import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { divideFilePageProperty } from "akasha/change/mechanical/file/divide/divide-file-page-property/divide-file-page-property.change-mechanical.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const PROPERTY = "property"

const DIVIDE = `${changeMechanical.slug}/${divideFilePageProperty.slug}` as const

export type DividePagePropertyAsked = {
  readonly at: string
  readonly property: string
}

export async function dividePageProperty(
  world: World,
  given: DividePagePropertyAsked
): Promise<Answer> {
  return (await reach(world, DIVIDE, { at: given.at, property: given.property })).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, PROPERTY]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const property = given[PROPERTY]
  if (property === undefined) return refusing(missing(PROPERTY))
  return await dividePageProperty(world, { at, property })
}
