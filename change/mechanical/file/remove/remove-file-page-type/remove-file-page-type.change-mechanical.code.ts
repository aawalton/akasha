import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const REMOVE_FILE_PAGE = "change-mechanical-file/remove-file-page"

export type Asked = {
  readonly at: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (await reach(world, REMOVE_FILE_PAGE, given)).said
}
