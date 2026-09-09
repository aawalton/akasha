import { partedIn } from "@akasha/pages/page-file-name"
import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/shadow/change-shadow.module.code.ts"

const RENAME_FILE_PAGE = "change-mechanical/rename-file-page"

const PAGE_TYPE = "page-type"

const AT = "at"

const TO = "to"

const PLURAL = "plural"

export type RenamePageAsked = {
  readonly at: string
  readonly to: string
  readonly plural?: string
}

export async function renamePage(world: World, given: RenamePageAsked): Promise<Answer> {
  const said = partedIn(given.at)
  if (said !== null && said.sections.length === 0 && said.pageType === PAGE_TYPE) {
    return refusing(
      `\`${given.at}\` is a page type, and \`rename-page-type\` renames one rather than this change`
    )
  }
  return (await reach(world, RENAME_FILE_PAGE, given)).said
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  const plural = given[PLURAL]
  return await renamePage(world, plural === undefined ? { at, to } : { at, to, plural })
}
