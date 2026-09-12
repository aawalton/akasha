import {
  gathered,
  refusing,
  untaken,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  sparedIn,
  unreachedIn,
} from "akasha/checks/code-checks/pages/no-unused-exports/no-unused-exports.code-check.decision.code.ts"
import { typed } from "akasha/code/typing/code-typing.module.code.ts"

const DROP = "change-mechanical-file-content/remove-export-keyword"

function surplusIn(world: World, pageTypes: ReadonlySet<string>, path: string): readonly string[] {
  const text = world.textOf(path)
  if (text === null) return []
  const found = unreachedIn(
    path,
    text,
    sparedIn(path, pageTypes),
    world.index.importersOf(path),
    world.textOf
  )
  return found.filter((one) => one.named).map((one) => one.name)
}

export async function removeUnusedExportKeywords(world: World): Promise<Answer> {
  const pageTypes = world.index.pageTypesIn()
  const answers: Answer[] = []
  for (const path of world.index.everyPath()) {
    if (!typed(path)) continue
    const names = surplusIn(world, pageTypes, path)
    if (names.length === 0) continue
    answers.push((await reach(world, DROP, { at: path, names })).said)
  }
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = []

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const named = Object.keys(given)[0]
  if (named !== undefined) return refusing(untaken(named, takes))
  return await removeUnusedExportKeywords(world)
}
