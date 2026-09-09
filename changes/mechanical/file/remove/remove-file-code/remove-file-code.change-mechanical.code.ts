import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const REMOVE_FILE = "change-mechanical-file/remove-file"

export type Asked = {
  readonly at: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (await reach(world, REMOVE_FILE, { at: given.at })).said
}
