import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  pageRenamed,
  type Asked as Renaming,
} from "akasha/changes/modules/page-renaming/page-renaming.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

export type Asked = Renaming

export function runChange(world: World, given: Asked): Answer {
  return pageRenamed(world, given)
}
