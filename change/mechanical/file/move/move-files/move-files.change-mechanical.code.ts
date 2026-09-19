import {
  refusing,
  type Said,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  carriedBy,
  refusalOver,
} from "akasha/change/modules/file-carrying/file-carrying.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly moved: Readonly<Record<string, string>>
}

export function moveFiles(world: World, given: Asked): Said {
  const moved = new Map(Object.entries(given.moved))
  const why = refusalOver(world, moved)
  if (why !== null) return refusing(why)
  const carried = carriedBy(world, moved)
  return typeof carried === "string" ? refusing(carried) : stating(carried)
}

export function runChange(world: World, given: Asked): Said {
  return moveFiles(world, given)
}
