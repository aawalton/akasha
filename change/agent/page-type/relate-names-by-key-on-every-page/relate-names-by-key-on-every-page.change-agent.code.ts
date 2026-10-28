import { relateNamesByKeyOnEveryPage as relateNamesByKeyOnEveryPageMechanical } from "akasha/change/mechanical/page-type/change/relate-names-by-key-on-every-page/relate-names-by-key-on-every-page.change-mechanical-page-type.ts"
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

const RELATE_NAMES =
  `${changeMechanicalPageType.slug}/${relateNamesByKeyOnEveryPageMechanical.slug}` as const

const TARGET = "target"

const BY = "by"

export type NamesAsked = KeyHoldingAsked & {
  readonly target: string
  readonly by: string
}

export async function relateNamesByKeyOnEveryPage(
  world: World,
  given: NamesAsked
): Promise<Answer> {
  return (await reach(world, RELATE_NAMES, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [...KEY_HOLDING_TAKES, TARGET, BY]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const asked = keyAskedIn(given)
  if (typeof asked === "string") return refusing(asked)
  const target = given[TARGET]
  if (target === undefined) return refusing(missing(TARGET))
  const by = given[BY]
  if (by === undefined) return refusing(missing(BY))
  return await relateNamesByKeyOnEveryPage(world, { ...asked, target, by })
}
