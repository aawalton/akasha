import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { removeEveryPageOfAType as removeEveryPageOfATypeMechanical } from "akasha/change/mechanical/page-type/remove/remove-every-page-of-a-type/remove-every-page-of-a-type.change-mechanical-page-type.ts"
import { missing, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { atMostIn } from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"

const REMOVE_EVERY_PAGE =
  `${changeMechanicalPageType.slug}/${removeEveryPageOfATypeMechanical.slug}` as const

const PAGE_TYPE = "page-type"

const AT_MOST = "at-most"

export type RemoveEveryPageOfATypeAsked = {
  readonly pageType: string
  readonly atMost?: number
}

export async function removeEveryPageOfAType(
  world: World,
  given: RemoveEveryPageOfATypeAsked
): Promise<Answer> {
  const atMost = given.atMost
  const read = atMost === undefined ? null : atMostIn(String(atMost))
  if (typeof read === "string") return refusing(read)
  return (await reach(world, REMOVE_EVERY_PAGE, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [PAGE_TYPE, AT_MOST]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return refusing(missing(PAGE_TYPE))
  const atMost = atMostIn(given[AT_MOST])
  if (typeof atMost === "string") return refusing(atMost)
  if (atMost === null) return await removeEveryPageOfAType(world, { pageType })
  return await removeEveryPageOfAType(world, { pageType, atMost })
}
