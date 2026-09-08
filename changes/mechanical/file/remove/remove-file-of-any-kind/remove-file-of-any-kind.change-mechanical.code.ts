import { extname } from "node:path"
import { pageNamed } from "@akasha/pages/page-file-name"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

const REMOVE_FILE = "change-mechanical-file/remove-file"

const REMOVE_FILE_CODE = "change-mechanical/remove-file-code"

const REMOVE_FILE_PAGE = "change-mechanical-file/remove-file-page"

const CODE = new Set([".ts", ".tsx"])

export type Asked = {
  readonly at: string
}

export function addressFor(world: World, at: string) {
  if (pageNamed(at, world.index.pageTypesIn())) return REMOVE_FILE_PAGE
  return CODE.has(extname(at)) ? REMOVE_FILE_CODE : REMOVE_FILE
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (await reach(world, addressFor(world, given.at), { at: given.at })).said
}
