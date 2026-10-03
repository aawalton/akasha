import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { foldBeatsIntoFile as foldBeatsIntoFileMechanical } from "akasha/change/mechanical/page-type/move/fold-beats-into-file/fold-beats-into-file.change-mechanical-page-type.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Asked,
  atMostIn,
} from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"

const FOLD_BEATS = `${changeMechanicalPageType.slug}/${foldBeatsIntoFileMechanical.slug}` as const

const PAGE_TYPE = "page-type"

const AT_MOST = "at-most"

export type Folding = { readonly pageType: string; readonly atMost?: number | null }

export async function foldBeatsIntoFile(world: World, given: Folding): Promise<Answer> {
  return (await reach(world, FOLD_BEATS, given)).said
}

export const takes: readonly string[] = [PAGE_TYPE, AT_MOST]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const pageType = given[PAGE_TYPE]
  if (pageType === undefined) return refusing(missing(PAGE_TYPE))
  const atMost = atMostIn(given[AT_MOST])
  if (typeof atMost === "string") return refusing(atMost)
  return await foldBeatsIntoFile(world, { pageType, atMost })
}
