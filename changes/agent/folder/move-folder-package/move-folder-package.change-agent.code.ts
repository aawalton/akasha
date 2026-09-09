import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const TO = "to"

const MOVE_FOLDER_PACKAGE = "change-mechanical-folder/move-folder-package"

export type MoveFolderPackageAsked = {
  readonly at: string
  readonly to: string
}

export async function moveFolderPackage(
  world: World,
  given: MoveFolderPackageAsked
): Promise<Answer> {
  return (await reach(world, MOVE_FOLDER_PACKAGE, given)).said
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await moveFolderPackage(world, { at, to })
}
