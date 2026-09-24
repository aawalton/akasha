import { qualifyRelationByKeyOnEveryPage as qualifyRelationByKeyOnEveryPageMechanical } from "akasha/change/mechanical/page-type/change/qualify-relation-by-key-on-every-page/qualify-relation-by-key-on-every-page.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  KEY_HOLDING_TAKES,
  type KeyHoldingAsked,
  keyAskedIn,
} from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"

const QUALIFY_BY_KEY =
  `${changeMechanicalPageType.slug}/${qualifyRelationByKeyOnEveryPageMechanical.slug}` as const

const FIELD = "field"

const TARGET = "target"

const BY = "by"

export type ByKeyAsked = KeyHoldingAsked & {
  readonly field: string
  readonly target: string
  readonly by: string
}

export async function qualifyRelationByKeyOnEveryPage(
  world: World,
  given: ByKeyAsked
): Promise<Answer> {
  return (await reach(world, QUALIFY_BY_KEY, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [...KEY_HOLDING_TAKES, FIELD, TARGET, BY]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const asked = keyAskedIn(given)
  if (typeof asked === "string") return refusing(asked)
  const field = given[FIELD]
  if (field === undefined) return refusing(missing(FIELD))
  const target = given[TARGET]
  if (target === undefined) return refusing(missing(TARGET))
  const by = given[BY]
  if (by === undefined) return refusing(missing(BY))
  return await qualifyRelationByKeyOnEveryPage(world, { ...asked, field, target, by })
}
