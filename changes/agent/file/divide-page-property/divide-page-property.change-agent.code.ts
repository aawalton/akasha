import { missing, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const PROPERTY = "property"

const DIVIDE = "change-mechanical/divide-file-page-property"

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

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const property = given[PROPERTY]
  if (property === undefined) return refusing(missing(PROPERTY))
  return await dividePageProperty(world, { at, property })
}
