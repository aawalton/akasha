import type { Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  type Asked,
  slugRenamed,
} from "akasha/changes/modules/slug-renaming/slug-renaming.module.code.ts"

export type RenamePageSlugAsked = Asked

export function runChange(world: World, given: RenamePageSlugAsked): Said {
  return slugRenamed(world, given)
}
