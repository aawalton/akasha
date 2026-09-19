import { changeFileContentCode } from "akasha/change/mechanical/file-content/change/change-file-content-code/change-file-content-code.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const CHANGE_FILE_CONTENT_CODE =
  `${changeMechanicalFileContent.slug}/${changeFileContentCode.slug}` as const

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
