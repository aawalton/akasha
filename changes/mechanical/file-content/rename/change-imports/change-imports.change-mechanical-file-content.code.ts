import type { Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  type Given,
  repointed,
} from "akasha/changes/modules/import-repointing/import-repointing.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

export function runChange(world: World, given: Given): Said {
  return repointed(world, given)
}
