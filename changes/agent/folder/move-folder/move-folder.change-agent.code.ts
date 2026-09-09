import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Said } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/shadow/change-shadow.module.code.ts"

const MOVE_FOLDER = "change-mechanical-folder/move-folder"

const AT = "at"

const TO = "to"

export type MoveFolderAsked = {
  readonly at: string
  readonly to: string
}

export async function moveFolder(world: World, given: MoveFolderAsked): Promise<Said> {
  return (await reach(world, MOVE_FOLDER, { from: given.at, to: given.to })).said
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Said> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await moveFolder(world, { at, to })
}
