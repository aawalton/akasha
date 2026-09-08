import { namedUnder, pageNamed } from "@akasha/pages/page-file-name"
import { refusing } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

const MOVE_FILE_PAGE = "change-mechanical-file/move-file-page"

const PAGE_TYPE = "page-type"

export type Asked = {
  readonly from: string
  readonly to: string
}

function pageTypeNamed(at: string, pageTypes: ReadonlySet<string>): boolean {
  return pageNamed(at, pageTypes) && namedUnder(at, pageTypes)?.pageTypeSlug === PAGE_TYPE
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  if (!pageTypeNamed(given.from, world.index.pageTypesIn())) {
    return refusing(
      `\`${given.from}\` is under no \`${PAGE_TYPE}\` name, so this change carries nothing`
    )
  }
  return (await reach(world, MOVE_FILE_PAGE, { from: given.from, to: given.to })).said
}
