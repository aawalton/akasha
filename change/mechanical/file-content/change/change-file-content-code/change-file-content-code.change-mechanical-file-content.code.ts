import { extname } from "node:path"
import { changeFileContent } from "akasha/change/mechanical/file-content/change/change-file-content/change-file-content.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const CHANGE_FILE = `${changeMechanicalFileContent.slug}/${changeFileContent.slug}` as const

const CODE = new Set([".ts", ".tsx"])

export type Asked = {
  readonly at: string
  readonly old: string
  readonly new: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  if (!CODE.has(extname(given.at))) {
    return refusing(`\`${given.at}\` is under no TypeScript name, so this change works no passage`)
  }
  return (await reach(world, CHANGE_FILE, { at: given.at, old: given.old, new: given.new })).said
}
