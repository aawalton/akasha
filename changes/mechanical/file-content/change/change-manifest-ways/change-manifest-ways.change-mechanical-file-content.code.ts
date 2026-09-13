import type { Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  type Asked,
  renameManifestWays,
} from "akasha/changes/modules/manifest-ways/manifest-ways.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

export function runChange(world: World, given: Asked): Said {
  return renameManifestWays(given, world.textOf)
}
