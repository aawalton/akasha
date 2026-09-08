import { pageNamed } from "@akasha/pages/page-file-name"
import { refusing } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

const MOVE_FILE_PAGE = "change-mechanical-file/move-file-page"

const PAGE_PROPERTY = "page-property"

export type Asked = {
  readonly from: string
  readonly to: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  if (!pageNamed(given.from, world.index.kindsUnder(PAGE_PROPERTY))) {
    return refusing(
      `\`${given.from}\` is under no page property name, so this change carries nothing`
    )
  }
  return (await reach(world, MOVE_FILE_PAGE, { from: given.from, to: given.to })).said
}
