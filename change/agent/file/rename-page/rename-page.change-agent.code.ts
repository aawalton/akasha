import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { renameFilePage } from "akasha/change/mechanical/file/rename/rename-file-page/rename-file-page.change-mechanical.ts"
import { missing, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const RENAME_FILE_PAGE = `${changeMechanical.slug}/${renameFilePage.slug}` as const

const PAGE_TYPE = "page-type"

const AT = "at"

const TO = "to"

export type RenamePageAsked = {
  readonly at: string
  readonly to: string
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

export const takes: readonly string[] = [AT, TO]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await renamePage(world, { at, to })
}
