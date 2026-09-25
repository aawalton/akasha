import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { renameFilePage } from "akasha/change/mechanical/page/rename/rename-file-page/rename-file-page.change-mechanical.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const RENAME_PAGE = `${changeMechanical.slug}/${renameFilePage.slug}` as const

export type Asked = {
  readonly at: string
  readonly to: string
  readonly plural?: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (await reach(world, RENAME_PAGE, given)).said
}
