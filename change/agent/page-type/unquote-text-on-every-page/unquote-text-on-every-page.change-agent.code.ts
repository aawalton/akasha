import { unquoteTextOnEveryPage as unquoteTextOnEveryPageMechanical } from "akasha/change/mechanical/page-type/change/unquote-text-on-every-page/unquote-text-on-every-page.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { type Answer, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  KEY_HOLDING_TAKES,
  type KeyHoldingAsked,
  keyAskedIn,
} from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"

const UNQUOTE_TEXT =
  `${changeMechanicalPageType.slug}/${unquoteTextOnEveryPageMechanical.slug}` as const

export async function unquoteTextOnEveryPage(
  world: World,
  given: KeyHoldingAsked
): Promise<Answer> {
  return (await reach(world, UNQUOTE_TEXT, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = KEY_HOLDING_TAKES

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const asked = keyAskedIn(given)
  if (typeof asked === "string") return refusing(asked)
  return await unquoteTextOnEveryPage(world, asked)
}
