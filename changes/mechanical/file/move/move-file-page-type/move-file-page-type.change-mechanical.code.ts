import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const MOVE_FILE_PAGE = "change-mechanical-file/move-file-page"

export type Asked = {
  readonly from: string
  readonly to: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (await reach(world, MOVE_FILE_PAGE, given)).said
}
