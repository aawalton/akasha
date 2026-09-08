import { pageNamed } from "@akasha/pages/page-file-name"
import { refusing } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

const REMOVE_FILE_PAGE = "change-mechanical-file/remove-file-page"

const PAGE_PROPERTY = "page-property"

export type Asked = {
  readonly at: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  if (!pageNamed(given.at, world.index.kindsUnder(PAGE_PROPERTY))) {
    return refusing(
      `\`${given.at}\` is under no page property name, so this change takes nothing away`
    )
  }
  return (await reach(world, REMOVE_FILE_PAGE, { at: given.at })).said
}
