import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFilePage } from "akasha/change/mechanical/file/remove/remove-file-page/remove-file-page.change-mechanical-file.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const REMOVE_FILE_PAGE = `${changeMechanicalFile.slug}/${removeFilePage.slug}` as const

export type Asked = {
  readonly at: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (await reach(world, REMOVE_FILE_PAGE, given)).said
}
