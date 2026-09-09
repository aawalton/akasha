import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const RENAME_FILE_PAGE = "change-mechanical/rename-file-page"

export type Asked = {
  readonly at: string
  readonly to: string
  readonly plural?: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (await reach(world, RENAME_FILE_PAGE, given)).said
}
