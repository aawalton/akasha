import { join, relative } from "node:path"
import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import {
  answered,
  missing,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const CHANGE_IMPORTS = "change-mechanical-code/change-imports"

const OUTSIDE = ".."

const AT = "at"

const TO = "to"

export type MoveFolderAsked = {
  readonly at: string
  readonly to: string
}

type Moved = { readonly moved: ReadonlyMap<string, string> } | { readonly refused: string }

function underneath(world: World, at: string): readonly string[] {
  const found: string[] = []
  for (const path of world.index.everyPath()) {
    const held = relative(at, path)
    if (held === "" || held.startsWith(OUTSIDE)) continue
    found.push(path)
  }
  return found.sort()
}

function movedInto(world: World, at: string, to: string, under: readonly string[]): Moved {
  const said = new Map<string, string>()
  for (const one of under) {
    const next = join(to, relative(at, one))
    if (world.textOf(next) !== null) return { refused: `\`${next}\` is a body already` }
    said.set(one, next)
  }
  return { moved: said }
}

export async function moveFolder(world: World, given: MoveFolderAsked): Promise<Answer> {
  if (given.at === given.to) return refusing(`\`${given.to}\` is the folder those files sit under`)
  const under = underneath(world, given.at)
  if (under.length === 0) return refusing(`\`${given.at}\` holds no file, so nothing is carried`)
  if (!relative(given.at, given.to).startsWith(OUTSIDE)) {
    return refusing(`\`${given.to}\` sits under \`${given.at}\`, so the folder is not carried`)
  }
  const said = movedInto(world, given.at, given.to, under)
  if ("refused" in said) return refusing(said.refused)
  const moved = said.moved
  const reading = importingOf(world.index, moved)
  if ("unread" in reading) return refusing(reading.unread)
  const carried = Object.fromEntries(moved)
  const edits: Edit[] = []
  let seen = world
  for (const [one, next] of moved) {
    if (seen.textOf(one) === null) return refusing(`\`${one}\` could not be read`)
    const answer = await reach(seen, CHANGE_IMPORTS, { was: one, now: next, moved: carried })
    if (answer.said.refused !== null) return answer.said
    edits.push(...answer.said.edits)
    seen = answer.world
  }
  for (const path of reading.importers) {
    if (moved.has(path)) continue
    const held = seen.textOf(path)
    if (held === null) return refusing(`\`${path}\` names a path that moved and could not be read`)
    const answer = await reach(seen, CHANGE_IMPORTS, { was: path, now: path, moved: carried })
    if (answer.said.refused !== null) return answer.said
    for (const one of answer.said.edits) {
      if (one.body !== held) edits.push(one)
    }
    seen = answer.world
  }
  return answered(edits)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await moveFolder(world, { at, to })
}
