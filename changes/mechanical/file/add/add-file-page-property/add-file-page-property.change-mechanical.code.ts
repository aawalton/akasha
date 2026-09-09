import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

const ADD_FILE_PAGE = "change-mechanical/add-file-page"

export type Asked = {
  readonly at: string
  readonly body: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (await reach(world, ADD_FILE_PAGE, { at: given.at, body: given.body })).said
}
