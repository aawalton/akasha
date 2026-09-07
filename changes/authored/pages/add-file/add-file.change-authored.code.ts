import { extname } from "node:path"
import { pageNamed } from "@akasha/pages/page-file-name"
import { missing, refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const AT = "at"

const BODY = "body"

const ADD_FILE = "change-mechanical/add-file"

const ADD_CODE_FILE = "change-mechanical/add-code-file"

const ADD_PAGE_FILE = "change-mechanical/add-page-file"

const CODE = new Set([".ts", ".tsx"])

function addressFor(world: World, at: string): string {
  if (pageNamed(at, world.index.pageTypesIn())) return ADD_PAGE_FILE
  return CODE.has(extname(at)) ? ADD_CODE_FILE : ADD_FILE
}

export type Asked = Readonly<Record<string, string>>

export async function addFileCommand(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const body = given[BODY]
  if (body === undefined) return refusing(missing(BODY))
  return (await reach(world, addressFor(world, at), { at, body })).said
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return await addFileCommand(world, given)
}
