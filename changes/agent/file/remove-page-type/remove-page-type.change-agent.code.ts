import { partedIn } from "@akasha/pages/page-file-name"
import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const AT = "at"

const PAGE_TYPE = "page-type"

const REMOVE_PAGE_TYPE = "change-mechanical/remove-file-page-type"

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

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  return await removePageType(world, { at })
}
