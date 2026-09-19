import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { removePageProperty as removePagePropertyMechanical } from "akasha/change/mechanical/page-property/remove-page-property/remove-page-property.change-mechanical.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const REMOVE_PAGE_PROPERTY =
  `${changeMechanical.slug}/${removePagePropertyMechanical.slug}` as const

const PROPERTY = "property"

export type RemovePagePropertyAsked = {
  readonly property: string
}

export async function removePageProperty(
  world: World,
  given: RemovePagePropertyAsked
): Promise<Answer> {
  return (await reach(world, REMOVE_PAGE_PROPERTY, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [PROPERTY]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const property = given[PROPERTY]
  if (property === undefined) return refusing(missing(PROPERTY))
  return await removePageProperty(world, { property })
}
