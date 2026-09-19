import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { removeExportKeyword } from "akasha/change/mechanical/file-content/remove/remove-export-keyword/remove-export-keyword.change-mechanical-file-content.ts"
import {
  type Answer,
  gathered,
  missing,
  refusing,
  untaken,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { droppableIn } from "akasha/change/modules/export-keyword/export-keyword.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  pathsNaming,
  TYPED_KINDS,
} from "akasha/change/modules/tree-searching/tree-searching.module.code.ts"
import {
  groupsSparing,
  loadersSparing,
  reachedByPathSparing,
  sparedIn,
  unreachedIn,
} from "akasha/check/code/pages/no-unused-exports/no-unused-exports.check-code.decision.code.ts"
import { changesSparing } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { typed } from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"

const DROP = `${changeMechanicalFileContent.slug}/${removeExportKeyword.slug}` as const

const MOST = "most"

const BUT = "but"

const KEYWORD = "export"

function surplusIn(
  world: World,
  pageTypes: ReadonlySet<string>,
  groups: ReadonlyMap<string, string>,
  loaders: ReadonlySet<string>,
  reached: ReadonlyMap<string, ReadonlySet<string>>,
  changes: ReadonlySet<string>,
  path: string
): readonly string[] {
  const text = world.textOf(path)
  if (text === null) return []
  const found = unreachedIn(
    path,
    text,
    sparedIn(path, pageTypes, groups, loaders, reached, changes, world.textOf),
    world.index.importersOf(path),
    world.textOf
  )
  const named = found.filter((one) => one.named).map((one) => one.name)
  return droppableIn(path, text, named)
}

export async function removeUnusedExportKeywords(
  world: World,
  most: number,
  but: ReadonlySet<string> = new Set()
): Promise<Answer> {
  const pageTypes = world.index.pageTypesIn()
  const groups = groupsSparing(world.index)
  const loaders = loadersSparing(world.index)
  const reached = reachedByPathSparing(world.index)
  const changes = changesSparing(world.index)
  const answers: Answer[] = []
  for (const path of pathsNaming(world, [KEYWORD], TYPED_KINDS)) {
    if (answers.length >= most) break
    if (!typed(path) || but.has(path)) continue
    const names = surplusIn(world, pageTypes, groups, loaders, reached, changes, path)
    if (names.length === 0) continue
    answers.push((await reach(world, DROP, { at: path, names })).said)
  }
  return gathered(answers)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [MOST, BUT]

function leftAlone(said: string | undefined): ReadonlySet<string> {
  if (said === undefined) return new Set()
  return new Set(
    said
      .split("\n")
      .map((one) => one.trim())
      .filter((one) => one.length > 0)
  )
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  for (const key of Object.keys(given)) {
    if (key !== MOST && key !== BUT) return refusing(untaken(key, takes))
  }
  const said = given[MOST]
  if (said === undefined) return refusing(missing(MOST))
  const most = Number(said)
  if (!Number.isInteger(most) || most < 1) {
    return refusing(`\`${said}\` is no count of files to drop the keyword in`)
  }
  return await removeUnusedExportKeywords(world, most, leftAlone(given[BUT]))
}
