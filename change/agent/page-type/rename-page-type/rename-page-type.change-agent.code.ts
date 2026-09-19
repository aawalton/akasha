import { changeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.ts"
import { renamePageType as renamePageTypeMechanical } from "akasha/change/mechanical/page-type/rename-page-type/rename-page-type.change-mechanical-page-type.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const AT = "at"

const TO = "to"

const PAGE_TYPE = "page-type"

const RENAME_PAGE_TYPE =
  `${changeMechanicalPageType.slug}/${renamePageTypeMechanical.slug}` as const

export type RenamePageTypeAsked = {
  readonly at: string
  readonly to: string
}

export async function renamePageType(world: World, given: RenamePageTypeAsked): Promise<Answer> {
  const said = partedIn(given.at)
  if (said === null || said.sections.length > 0) {
    return refusing(`\`${given.at}\` reads as no page file, so no page type is renamed`)
  }
  if (said.pageType !== PAGE_TYPE) {
    return refusing(
      `\`${given.at}\` is no page type, and \`rename-page\` renames a page rather than this change`
    )
  }
  return (await reach(world, RENAME_PAGE_TYPE, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, TO]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await renamePageType(world, { at, to })
}
