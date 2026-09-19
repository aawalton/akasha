import { changeMechanicalFolder } from "akasha/change/mechanical/folder/change-mechanical-folder.page-type.ts"
import { removeFolder as removeFolderMechanical } from "akasha/change/mechanical/folder/remove-folder/remove-folder.change-mechanical-folder.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const REMOVE_FOLDER = `${changeMechanicalFolder.slug}/${removeFolderMechanical.slug}` as const

export type RemoveFolderAsked = {
  readonly at: string
}

export async function removeFolder(world: World, given: RemoveFolderAsked): Promise<Answer> {
  return (await reach(world, REMOVE_FOLDER, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  return await removeFolder(world, { at })
}
