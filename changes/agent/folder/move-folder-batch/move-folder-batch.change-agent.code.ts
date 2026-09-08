import { join, relative, sep } from "node:path"
import {
  missing,
  refusing,
  stating,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Said, Stated } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const MOVE_FILE = "change-mechanical-file/move-file"

const OUTSIDE = ".."

const AT = "at"

const TO = "to"

const COUNT = "count"

export type MoveFolderBatchAsked = {
  readonly at: string
  readonly to: string
  readonly count: number
}

function childrenIn(world: World, at: string): ReadonlyMap<string, string[]> {
  const found = new Map<string, string[]>()
  for (const path of world.index.everyPath()) {
    const held = relative(at, path)
    if (held === "" || held.startsWith(OUTSIDE)) continue
    const cut = held.indexOf(sep)
    const child = cut < 0 ? held : held.slice(0, cut)
    const kept = found.get(child)
    if (kept === undefined) found.set(child, [path])
    else kept.push(path)
  }
  return found
}

export async function moveFolderBatch(world: World, given: MoveFolderBatchAsked): Promise<Said> {
  if (given.at === given.to) return refusing(`\`${given.to}\` is the folder those files sit under`)
  if (!Number.isInteger(given.count) || given.count < 1) {
    return refusing(`\`${given.count}\` is no count of children to carry`)
  }
  if (!relative(given.at, given.to).startsWith(OUTSIDE)) {
    return refusing(`\`${given.to}\` sits under \`${given.at}\`, so the folder is not carried`)
  }
  const children = childrenIn(world, given.at)
  if (children.size === 0) return refusing(`\`${given.at}\` holds no file, so nothing is carried`)
  const edits: Stated[] = []
  let seen = world
  for (const child of [...children.keys()].sort().slice(0, given.count)) {
    for (const one of (children.get(child) ?? []).sort()) {
      const carrying = await reach(seen, MOVE_FILE, {
        from: one,
        to: join(given.to, relative(given.at, one)),
      })
      if (carrying.said.refused !== null) return carrying.said
      edits.push(...carrying.said.edits)
      seen = carrying.world
    }
  }
  return stating(edits)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Said> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  const count = given[COUNT]
  if (count === undefined) return refusing(missing(COUNT))
  return await moveFolderBatch(world, { at, to, count: Number(count) })
}
