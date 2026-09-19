import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFile } from "akasha/change/mechanical/file/add/add-file/add-file.change-mechanical-file.ts"
import { addFileCode } from "akasha/change/mechanical/file/add/add-file-code/add-file-code.change-mechanical.ts"
import { addFilePage } from "akasha/change/mechanical/file/add/add-file-page/add-file-page.change-mechanical.ts"
import { addFilePageProperty } from "akasha/change/mechanical/file/add/add-file-page-property/add-file-page-property.change-mechanical.ts"
import { addFilePageType } from "akasha/change/mechanical/file/add/add-file-page-type/add-file-page-type.change-mechanical.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { kindOf, pagedAt } from "akasha/change/modules/target-kinding/target-kinding.module.code.ts"
import { insertedInto } from "akasha/code/reading/modules/value-inserting/value-inserting.module.code.ts"
import { uuidVersion7 } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"
import { loadedFrom } from "akasha/page/modules/value/page-value.module.code.ts"

const AUTO = "auto"

const ID = "id"

const HELD = "the body states an `id` of its own, so `id` is left out or said as `auto`"

const NO_LITERAL = "the body declares no literal, so no `id` goes into the body"

const BLANK = "an `id` stating nothing is no id, so `id` is left out or said as `auto`"

const ADDRESSES = {
  file: `${changeMechanicalFile.slug}/${addFile.slug}`,
  "file-code": `${changeMechanical.slug}/${addFileCode.slug}`,
  "file-page": `${changeMechanical.slug}/${addFilePage.slug}`,
  "file-page-property": `${changeMechanical.slug}/${addFilePageProperty.slug}`,
  "file-page-type": `${changeMechanical.slug}/${addFilePageType.slug}`,
} as const

export function addressFor(world: World, at: string) {
  return ADDRESSES[kindOf(world, at)]
}

export function idFilled(at: string, body: string, said: string): string | { refused: string } {
  if (said.trim() === "") return { refused: BLANK }
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
  readonly old?: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const address = ADDRESSES[kindOf(world, given.at)]
  const old = given.old
  if (!pagedAt(world, given.at)) {
    return (await reach(world, address, { at: given.at, body: given.body, old })).said
  }
  const filled = idFilled(given.at, given.body, given.id ?? AUTO)
  if (typeof filled !== "string") return refusing(filled.refused)
  return (await reach(world, address, { at: given.at, body: filled, old })).said
}
