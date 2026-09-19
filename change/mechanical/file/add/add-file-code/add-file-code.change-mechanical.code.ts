import { addFile } from "akasha/change/mechanical/file/add/add-file/add-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const ADD_FILE = `${changeMechanicalFile.slug}/${addFile.slug}` as const

export type Asked = {
  readonly at: string
  readonly body: string
  readonly old?: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (await reach(world, ADD_FILE, { at: given.at, body: given.body, old: given.old })).said
}
