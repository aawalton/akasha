import { pathsIn, type Said } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { exportRenamed } from "akasha/change/modules/export-renaming/export-renaming.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  type Placing,
  placingOver,
} from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"

export function renameExport(
  root: string,
  at: string,
  over: readonly string[],
  of: string,
  to: string,
  textOf: (path: string) => string | null,
  placed: Placing
): Said {
  return exportRenamed(root, at, over, of, to, textOf, placed)
}

export type Given = {
  readonly at: string
  readonly over: readonly string[]
  readonly of: string
  readonly to: string
}

export function runChange(world: World, given: Given): Said {
  const placed = placingOver(pathsIn(world.over), world.textOf)
  return renameExport(world.root, given.at, given.over, given.of, given.to, world.textOf, placed)
}
