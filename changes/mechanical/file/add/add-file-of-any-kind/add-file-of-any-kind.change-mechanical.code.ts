import { insertedInto } from "@akasha/code/value-inserting"
import { loadedFrom } from "@akasha/pages/page-value"
import { uuidVersion7 } from "akasha/id-minting/uuid-version-7/uuid-version-7.module.code.ts"
import { refusing } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { type Kind, kindOf } from "../../../../modules/target-kinding/target-kinding.module.code.ts"

const AUTO = "auto"

const ID = "id"

const HELD = "the body states an `id` of its own, so `id` is left out or said as `auto`"

const NO_LITERAL = "the body declares no literal, so no `id` goes into the body"

const ADDRESSES = {
  file: "change-mechanical-file/add-file",
  "file-code": "change-mechanical/add-file-code",
  "file-page": "change-mechanical/add-file-page",
  "file-page-property": "change-mechanical/add-file-page-property",
  "file-page-type": "change-mechanical/add-file-page-type",
} as const

const PAGES = new Set<Kind>(["file-page", "file-page-property", "file-page-type"])

export function addressFor(world: World, at: string) {
  return ADDRESSES[kindOf(world, at)]
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
  const kind = kindOf(world, given.at)
  const address = ADDRESSES[kind]
  if (!PAGES.has(kind)) {
    return (await reach(world, address, { at: given.at, body: given.body })).said
  }
  const filled = idFilled(given.at, given.body, given.id ?? AUTO)
  if (typeof filled !== "string") return refusing(filled.refused)
  return (await reach(world, address, { at: given.at, body: filled })).said
}
