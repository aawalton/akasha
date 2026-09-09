import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const CHANGE_FILE_CONTENT_CODE = "change-mechanical-file-content/change-file-content-code"

export type Asked = {
  readonly at: string
  readonly old: string
  readonly new: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (
    await reach(world, CHANGE_FILE_CONTENT_CODE, {
      at: given.at,
      old: given.old,
      new: given.new,
    })
  ).said
}
