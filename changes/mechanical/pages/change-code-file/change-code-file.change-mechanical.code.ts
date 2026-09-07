import { extname } from "node:path"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const CHANGE_FILE = "change-mechanical/change-file"

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
