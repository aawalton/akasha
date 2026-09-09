import { basename, dirname, join } from "node:path"
import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Said } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/shadow/change-shadow.module.code.ts"

const MOVE_FILE_PAGE = "change-mechanical/move-file-of-any-kind"

const AT = "at"

const TO = "to"

export type MovePageAsked = {
  readonly at: string
  readonly to: string
}

export async function movePage(world: World, given: MovePageAsked): Promise<Said> {
  if (dirname(given.at) === given.to) {
    return refusing(`\`${given.to}\` is the folder the page already sits in`)
  }
  const to = join(given.to, basename(given.at))
  return (await reach(world, MOVE_FILE_PAGE, { from: given.at, to })).said
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Said> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await movePage(world, { at, to })
}
