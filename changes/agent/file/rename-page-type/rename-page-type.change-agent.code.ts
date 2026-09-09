import { partedIn } from "@akasha/pages/page-file-name"
import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const AT = "at"

const TO = "to"

const PLURAL = "plural"

const PAGE_TYPE = "page-type"

const RENAME_FILE_PAGE_TYPE = "change-mechanical/rename-file-page-type"

export type RenamePageTypeAsked = {
  readonly at: string
  readonly to: string
  readonly plural?: string
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
  return (await reach(world, RENAME_FILE_PAGE_TYPE, given)).said
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  const plural = given[PLURAL]
  return await renamePageType(world, plural === undefined ? { at, to } : { at, to, plural })
}
