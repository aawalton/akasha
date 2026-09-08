import { dirname } from "node:path"
import { partedIn } from "../../../../../pages/file-name/page-file-name.module.code.ts"
import { refusing } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

const PACKAGE = "workspace-package"

const REMOVE_FOLDER = "change-mechanical-folder/remove-folder"

export type Asked = {
  readonly at: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const parted = partedIn(given.at)
  if (parted === null || parted.pageType !== PACKAGE) {
    return refusing(`\`${given.at}\` names no \`${PACKAGE}\`, so no folder is taken away`)
  }
  return (await reach(world, REMOVE_FOLDER, { at: dirname(given.at) })).said
}
