import type { Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  pageTypeRestated,
  type Asked as Restating,
} from "akasha/changes/modules/page-type-restating/page-type-restating.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

export type Asked = Restating

export function runChange(world: World, given: Asked): Said {
  return pageTypeRestated(world, given)
}
