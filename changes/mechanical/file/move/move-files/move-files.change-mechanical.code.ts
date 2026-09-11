import { refusing, stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { carriedBy } from "akasha/changes/modules/file-carrying/file-carrying.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly moved: Readonly<Record<string, string>>
}

function refusalIn(world: World, moved: ReadonlyMap<string, string>): string | null {
  if (moved.size === 0) return "no path was handed in, so nothing is moved"
  for (const [from, to] of moved) {
    if (from === to) return `\`${to}\` is the path it already sits at`
    if (world.bodyOf(from) === null) return `\`${from}\` holds no body, so nothing is moved`
    if (world.bodyOf(to) !== null) return `\`${to}\` is a body already`
  }
  return null
}

export function moveFiles(world: World, given: Asked): Said {
  const moved = new Map(Object.entries(given.moved))
  const why = refusalIn(world, moved)
  if (why !== null) return refusing(why)
  const carried = carriedBy(world, moved)
  return typeof carried === "string" ? refusing(carried) : stating(carried)
}

export function runChange(world: World, given: Asked): Said {
  return moveFiles(world, given)
}
