import { partedIn } from "@akasha/pages/page-file-name"
import { removePage as removeOrdinaryPage } from "../../../mechanical/pages/remove-page/remove-page.change-mechanical.code.ts"
import { missing, refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const AT = "at"

const PAGE_TYPE = "page-type"

export type RemovePageAsked = {
  readonly at: string
}

export function removePage(world: World, given: RemovePageAsked): Answer {
  const said = partedIn(given.at)
  if (said === null || said.sections.length > 0) {
    return refusing(`\`${given.at}\` reads as no page file, so no page is taken away`)
  }
  if (said.pageType === PAGE_TYPE) {
    return refusing(
      `\`${given.at}\` is a page type, which \`remove-page-type\` takes away rather than this change`
    )
  }
  return removeOrdinaryPage(world, { at: given.at })
}

export type Asked = Readonly<Record<string, string>>

// A command line hands the arguments in as text worked out while the command runs, so the shape is
// read here rather than trusted, and a shape this change cannot use is refused by name.
export function runChange(world: World, given: Asked): Answer {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  return removePage(world, { at })
}
