import { extname } from "node:path"
import { insertedInto } from "@akasha/code/value-inserting"
import { uuidVersion7 } from "@akasha/id-minting/uuid-version-7"
import { pageNamed } from "@akasha/pages/page-file-name"
import { loadedFrom } from "@akasha/pages/page-value"
import { refusing } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

const AUTO = "auto"

const ID = "id"

const HELD = "the body states an `id` of its own, so `id` is left out or said as `auto`"

const NO_LITERAL = "the body declares no literal, so no `id` goes into the body"

const ADD_FILE = "change-mechanical-file/add-file"

const ADD_FILE_CODE = "change-mechanical/add-file-code"

const ADD_FILE_PAGE = "change-mechanical/add-file-page"

const CODE = new Set([".ts", ".tsx"])

export function addressFor(world: World, at: string) {
  if (pageNamed(at, world.index.pageTypesIn())) return ADD_FILE_PAGE
  return CODE.has(extname(at)) ? ADD_FILE_CODE : ADD_FILE
}

export function idFilled(at: string, body: string, said: string): string | { refused: string } {
  const held = loadedFrom(body).value
  if (held !== null && held[ID] !== undefined) {
    return said === AUTO ? body : { refused: HELD }
  }
  const minted = said === AUTO ? uuidVersion7() : said
  const next = insertedInto(at, body, ID, JSON.stringify(minted))
  return next === null ? { refused: NO_LITERAL } : next
}

export type Asked = {
  readonly at: string
  readonly body: string
  readonly id?: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const address = addressFor(world, given.at)
  if (address !== ADD_FILE_PAGE) {
    return (await reach(world, address, { at: given.at, body: given.body })).said
  }
  const filled = idFilled(given.at, given.body, given.id ?? AUTO)
  if (typeof filled !== "string") return refusing(filled.refused)
  return (await reach(world, address, { at: given.at, body: filled })).said
}
