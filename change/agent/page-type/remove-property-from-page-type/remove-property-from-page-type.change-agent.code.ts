import { missing, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const REMOVE_PROPERTY = "change-mechanical-page-type/remove-property-from-page-type"

const AT = "at"

const PROPERTY = "property"

export type RemovePropertyFromPageTypeAsked = {
  readonly at: string
  readonly property: string
}

export async function removePropertyFromPageType(
  world: World,
  given: RemovePropertyFromPageTypeAsked
): Promise<Answer> {
  return (await reach(world, REMOVE_PROPERTY, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, PROPERTY]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const property = given[PROPERTY]
  if (property === undefined) return refusing(missing(PROPERTY))
  return await removePropertyFromPageType(world, { at, property })
}
