import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const ADD_FILE = "change-mechanical-file/add-file"

export type Asked = {
  readonly at: string
  readonly body: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (await reach(world, ADD_FILE, { at: given.at, body: given.body })).said
}
