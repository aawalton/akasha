import type { Answer } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  pageRenamed,
  type Asked as Renaming,
} from "akasha/change/modules/page-renaming/page-renaming.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

export type Asked = Renaming

export function runChange(world: World, given: Asked): Answer {
  return pageRenamed(world, given)
}
