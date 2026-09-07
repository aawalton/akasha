import { pageNamed } from "@akasha/pages/page-file-name"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const ADD_CODE_FILE = "change-mechanical/add-code-file"

export type Asked = {
  readonly at: string
  readonly body: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  if (!pageNamed(given.at, world.index.pageTypesIn())) {
    return refusing(`\`${given.at}\` is under no page name, so this change writes nothing`)
  }
  return await reach(world, ADD_CODE_FILE, { at: given.at, body: given.body })
}
