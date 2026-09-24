import { copyEntryKeyOnEveryPage as copyEntryKeyOnEveryPageMechanical } from "akasha/change/mechanical/page-type/add/copy-entry-key-on-every-page/copy-entry-key-on-every-page.change-mechanical-page-type.ts"
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

const COPY_ENTRY_KEY =
  `${changeMechanicalPageType.slug}/${copyEntryKeyOnEveryPageMechanical.slug}` as const

const FROM = "from"

const TO = "to"

export type EntryKeyAsked = KeyHoldingAsked & {
  readonly from: string
  readonly to: string
}

export async function copyEntryKeyOnEveryPage(world: World, given: EntryKeyAsked): Promise<Answer> {
  return (await reach(world, COPY_ENTRY_KEY, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [...KEY_HOLDING_TAKES, FROM, TO]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const asked = keyAskedIn(given)
  if (typeof asked === "string") return refusing(asked)
  const from = given[FROM]
  if (from === undefined) return refusing(missing(FROM))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await copyEntryKeyOnEveryPage(world, { ...asked, from, to })
}
