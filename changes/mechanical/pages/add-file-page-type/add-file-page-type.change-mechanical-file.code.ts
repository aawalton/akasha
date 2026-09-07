import { namedUnder, pageNamed } from "@akasha/pages/page-file-name"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const ADD_FILE_PAGE = "change-mechanical-file/add-file-page"

const PAGE_TYPE = "page-type"

export type Asked = {
  readonly at: string
  readonly body: string
}

function pageTypeNamed(at: string, pageTypes: ReadonlySet<string>): boolean {
  return pageNamed(at, pageTypes) && namedUnder(at, pageTypes)?.pageTypeSlug === PAGE_TYPE
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  if (!pageTypeNamed(given.at, world.index.pageTypesIn())) {
    return refusing(
      `\`${given.at}\` is under no \`${PAGE_TYPE}\` name, so this change writes nothing`
    )
  }
  return (await reach(world, ADD_FILE_PAGE, { at: given.at, body: given.body })).said
}
