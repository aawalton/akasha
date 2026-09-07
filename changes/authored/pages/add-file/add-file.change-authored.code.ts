import { extname } from "node:path"
import { insertedInto } from "@akasha/code/value-inserting"
import { uuidVersion7 } from "@akasha/id-minting/uuid-version-7"
import { pageNamed } from "@akasha/pages/page-file-name"
import { loadedFrom } from "@akasha/pages/page-value"
import { missing, refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import type { Changes } from "../../../runners/pages/change-running/change-running.change-runner.addressed.ts"

const AT = "at"

const AUTO = "auto"

const BODY = "body"

const ID = "id"

const HELD = "the body states an `id` of its own, so `id` is left out or said as `auto`"

const NO_LITERAL = "the body declares no literal, so no `id` goes into the body"

const ADD_FILE = "change-mechanical/add-file"

const ADD_CODE_FILE = "change-mechanical/add-code-file"

const ADD_PAGE_FILE = "change-mechanical/add-page-file"

const CODE = new Set([".ts", ".tsx"])

function addressFor(world: World, at: string): keyof Changes {
  if (pageNamed(at, world.index.pageTypesIn())) return ADD_PAGE_FILE
  return CODE.has(extname(at)) ? ADD_CODE_FILE : ADD_FILE
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

export type Asked = Readonly<Record<string, string>>

export async function addFileCommand(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const body = given[BODY]
  if (body === undefined) return refusing(missing(BODY))
  const address = addressFor(world, at)
  if (address !== ADD_PAGE_FILE) return (await reach(world, address, { at, body })).said
  const filled = idFilled(at, body, given[ID] ?? AUTO)
  if (typeof filled !== "string") return refusing(filled.refused)
  return (await reach(world, address, { at, body: filled })).said
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return await addFileCommand(world, given)
}
