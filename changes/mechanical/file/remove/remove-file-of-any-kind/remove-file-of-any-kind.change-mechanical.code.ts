import { extname } from "node:path"
import { namedUnder, pageNamed } from "@akasha/pages/page-file-name"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

const REMOVE_FILE = "change-mechanical-file/remove-file"

const REMOVE_FILE_CODE = "change-mechanical/remove-file-code"

const REMOVE_FILE_PAGE = "change-mechanical-file/remove-file-page"

const REMOVE_FILE_PAGE_TYPE = "change-mechanical/remove-file-page-type"

const REMOVE_FILE_PAGE_PROPERTY = "change-mechanical/remove-file-page-property"

const PAGE_TYPE = "page-type"

const PAGE_PROPERTY = "page-property"

const CODE = new Set([".ts", ".tsx"])

export type Asked = {
  readonly at: string
}

export function addressFor(world: World, at: string) {
  const named = world.index.pageTypesIn()
  if (pageNamed(at, named)) {
    if (namedUnder(at, named)?.pageTypeSlug === PAGE_TYPE) return REMOVE_FILE_PAGE_TYPE
    if (pageNamed(at, world.index.kindsUnder(PAGE_PROPERTY))) return REMOVE_FILE_PAGE_PROPERTY
    return REMOVE_FILE_PAGE
  }
  return CODE.has(extname(at)) ? REMOVE_FILE_CODE : REMOVE_FILE
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (await reach(world, addressFor(world, given.at), { at: given.at })).said
}
