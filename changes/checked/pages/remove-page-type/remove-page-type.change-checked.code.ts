import { partedIn } from "@akasha/pages/page-file-name"
import { removePageType as removeTheType } from "../../../mechanical/pages/remove-page-type/remove-page-type.change-mechanical.code.ts"
import { missing, refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const AT = "at"

const PAGE_TYPE = "page-type"

export type RemovePageTypeAsked = {
  readonly at: string
}

export function removePageType(world: World, given: RemovePageTypeAsked): Answer {
  const said = partedIn(given.at)
  if (said === null || said.sections.length > 0) {
    return refusing(`\`${given.at}\` reads as no page file, so no page type is taken away`)
  }
  if (said.pageType !== PAGE_TYPE) {
    return refusing(
      `\`${given.at}\` is no page type, and \`remove-page\` takes a page away rather than this change`
    )
  }
  return removeTheType(world, { at: given.at })
}

export type Asked = Readonly<Record<string, string>>

// A command line hands the arguments in as text worked out while the command runs, so the shape is
// read here rather than trusted, and a shape this change cannot use is refused by name.
export function runChange(world: World, given: Asked): Answer {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  return removePageType(world, { at })
}
