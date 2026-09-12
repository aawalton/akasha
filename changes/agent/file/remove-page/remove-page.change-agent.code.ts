import { missing, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"

const AT = "at"

const PAGE_TYPE = "page-type"

const REMOVE_PAGE = "change-mechanical/remove-file-of-any-kind"

export type RemovePageAsked = {
  readonly at: string
}

export async function removePage(world: World, given: RemovePageAsked): Promise<Answer> {
  const said = partedIn(given.at)
  if (said === null || said.sections.length > 0) {
    return refusing(`\`${given.at}\` reads as no page file, so no page is taken away`)
  }
  if (said.pageType === PAGE_TYPE) {
    return refusing(
      `\`${given.at}\` is a page type, which \`remove-page-type\` takes away rather than this change`
    )
  }
  return (await reach(world, REMOVE_PAGE, { at: given.at })).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  return await removePage(world, { at })
}
