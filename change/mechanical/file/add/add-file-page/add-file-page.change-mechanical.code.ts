import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileCode } from "akasha/change/mechanical/file/add/add-file-code/add-file-code.change-mechanical.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const ADD_FILE_CODE = `${changeMechanical.slug}/${addFileCode.slug}` as const

export type Asked = {
  readonly at: string
  readonly body: string
  readonly old?: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (await reach(world, ADD_FILE_CODE, { at: given.at, body: given.body, old: given.old }))
    .said
}
