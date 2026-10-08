import { addPageInstants as addPageInstantsMechanical } from "akasha/change/mechanical/page-type/add/add-page-instants/add-page-instants.change-mechanical-page-type.ts"
import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { atMostIn } from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"

const ADD_PAGE_INSTANTS =
  `${changeMechanicalPageType.slug}/${addPageInstantsMechanical.slug}` as const

const PAGE_TYPE = "page-type"

const AT_MOST = "at-most"

export type InstantsAsked = {
  readonly pageType: string
  readonly atMost: number | null
}

export async function addPageInstants(world: World, given: InstantsAsked): Promise<Answer> {
  return (await reach(world, ADD_PAGE_INSTANTS, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [PAGE_TYPE, AT_MOST]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return refusing(missing(PAGE_TYPE))
  const atMost = atMostIn(given[AT_MOST])
  if (typeof atMost === "string") return refusing(atMost)
  return await addPageInstants(world, { pageType, atMost })
}
