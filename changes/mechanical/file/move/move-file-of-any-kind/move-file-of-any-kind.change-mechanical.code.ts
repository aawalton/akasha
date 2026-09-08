import { extname } from "node:path"
import { namedUnder, pageNamed } from "@akasha/pages/page-file-name"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

const MOVE_FILE = "change-mechanical-file/move-file"

const MOVE_FILE_CODE = "change-mechanical/move-file-code"

const MOVE_FILE_PAGE = "change-mechanical-file/move-file-page"

const MOVE_FILE_PAGE_TYPE = "change-mechanical/move-file-page-type"

const MOVE_FILE_PAGE_PROPERTY = "change-mechanical/move-file-page-property"

const PAGE_TYPE = "page-type"

const PAGE_PROPERTY = "page-property"

const CODE = new Set([".ts", ".tsx"])

export function addressFor(world: World, at: string) {
  const named = world.index.pageTypesIn()
  if (pageNamed(at, named)) {
    if (namedUnder(at, named)?.pageTypeSlug === PAGE_TYPE) return MOVE_FILE_PAGE_TYPE
    if (pageNamed(at, world.index.kindsUnder(PAGE_PROPERTY))) return MOVE_FILE_PAGE_PROPERTY
    return MOVE_FILE_PAGE
  }
  return CODE.has(extname(at)) ? MOVE_FILE_CODE : MOVE_FILE
}

export type Asked = {
  readonly from: string
  readonly to: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const address = addressFor(world, given.from)
  return (await reach(world, address, { from: given.from, to: given.to })).said
}
