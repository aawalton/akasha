import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { removeFilePageType } from "akasha/change/mechanical/file/remove/remove-file-page-type/remove-file-page-type.change-mechanical.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const AT = "at"

const PAGE_TYPE = "page-type"

const REMOVE_PAGE_TYPE = `${changeMechanical.slug}/${removeFilePageType.slug}` as const

export type RemovePageTypeAsked = {
  readonly at: string
}

export async function removePageType(world: World, given: RemovePageTypeAsked): Promise<Answer> {
  const said = partedIn(given.at)
  if (said === null || said.sections.length > 0) {
    return refusing(`\`${given.at}\` reads as no page file, so no page type is taken away`)
  }
  if (said.pageType !== PAGE_TYPE) {
    return refusing(
      `\`${given.at}\` is no page type, and \`remove-page\` takes a page away rather than this change`
    )
  }
  return (await reach(world, REMOVE_PAGE_TYPE, { at: given.at })).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  return await removePageType(world, { at })
}
