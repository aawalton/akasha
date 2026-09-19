import { qualifyRelationOnEveryPage as qualifyRelationOnEveryPageMechanical } from "akasha/change/mechanical/page-type/change/qualify-relation-on-every-page/qualify-relation-on-every-page.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { type Answer, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type KeyHoldingAsked,
  keyAskedIn,
  keyHoldingTakes,
} from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"

const QUALIFY_RELATION =
  `${changeMechanicalPageType.slug}/${qualifyRelationOnEveryPageMechanical.slug}` as const

const FIELD = "field"

export type FieldHoldingAsked = KeyHoldingAsked & { readonly field?: string | null }

export async function qualifyRelationOnEveryPage(
  world: World,
  given: FieldHoldingAsked
): Promise<Answer> {
  return (await reach(world, QUALIFY_RELATION, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [...keyHoldingTakes, FIELD]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const asked = keyAskedIn(given)
  if (typeof asked === "string") return refusing(asked)
  return await qualifyRelationOnEveryPage(world, { ...asked, field: given[FIELD] ?? null })
}
