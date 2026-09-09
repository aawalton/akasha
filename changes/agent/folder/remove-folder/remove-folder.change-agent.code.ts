import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const AT = "at"

const REMOVE_FOLDER = "change-mechanical-folder/remove-folder"

export type RemoveFolderAsked = {
  readonly at: string
}

export async function removeFolder(world: World, given: RemoveFolderAsked): Promise<Answer> {
  return (await reach(world, REMOVE_FOLDER, given)).said
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  return await removeFolder(world, { at })
}
