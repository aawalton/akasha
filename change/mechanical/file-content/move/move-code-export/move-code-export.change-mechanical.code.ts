import { changeFileContent } from "akasha/change/mechanical/file-content/change/change-file-content/change-file-content.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { refusing, stating } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer, FileChange } from "akasha/change/modules/answer/change-answer.module.types.ts"
import {
  passagesOf,
  plannedCarrying,
} from "akasha/change/modules/code-export-carrying/code-export-carrying.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const CHANGE_FILE_CONTENT = `${changeMechanicalFileContent.slug}/${changeFileContent.slug}` as const

const MADE_BY = "`divide-file-code` makes a file that is not there yet"

export type Asked = {
  readonly from: string
  readonly to: string
  readonly of: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  if (world.textOf(given.to) === null) {
    return refusing(`\`${given.to}\` holds no body, and ${MADE_BY}`)
  }
  const made = plannedCarrying(world, { from: given.from, to: given.to, of: [given.of] })
  if ("refused" in made) return refusing(made.refused)
  const edits: FileChange[] = []
  let seen = world
  for (const one of passagesOf(made)) {
    const said = await reach(seen, CHANGE_FILE_CONTENT, one)
    if (said.said.refused !== null) return said.said
    edits.push(...said.said.edits)
    seen = said.world
  }
  return stating(edits)
}
