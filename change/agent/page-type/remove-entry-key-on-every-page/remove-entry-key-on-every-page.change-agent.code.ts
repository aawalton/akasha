import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { removeEntryKeyOnEveryPage as removeEntryKeyOnEveryPageMechanical } from "akasha/change/mechanical/page-type/remove/remove-entry-key-on-every-page/remove-entry-key-on-every-page.change-mechanical-page-type.ts"
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

const REMOVE_ENTRY_KEY =
  `${changeMechanicalPageType.slug}/${removeEntryKeyOnEveryPageMechanical.slug}` as const

const FIELD = "field"

const KEPT = "kept"

export type EntryKeyGoing = KeyHoldingAsked & {
  readonly field: string
  readonly kept: string | null
}

export async function removeEntryKeyOnEveryPage(
  world: World,
  given: EntryKeyGoing
): Promise<Answer> {
  return (await reach(world, REMOVE_ENTRY_KEY, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [...KEY_HOLDING_TAKES, FIELD, KEPT]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const asked = keyAskedIn(given)
  if (typeof asked === "string") return refusing(asked)
  const field = given[FIELD]
  if (field === undefined) return refusing(missing(FIELD))
  return await removeEntryKeyOnEveryPage(world, { ...asked, field, kept: given[KEPT] ?? null })
}
