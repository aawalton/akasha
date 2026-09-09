import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const REMOVE_FOLDER_PACKAGE = "change-mechanical-folder/remove-folder-package"

export type RemoveFolderPackageAsked = {
  readonly at: string
}

export async function removeFolderPackage(
  world: World,
  given: RemoveFolderPackageAsked
): Promise<Answer> {
  return (await reach(world, REMOVE_FOLDER_PACKAGE, given)).said
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  return await removeFolderPackage(world, { at })
}
