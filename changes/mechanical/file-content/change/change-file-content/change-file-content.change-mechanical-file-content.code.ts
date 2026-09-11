import { stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly at: string
  readonly old: string
  readonly new: string
}

export function runChange(_world: World, given: Asked): Said {
  return stating([
    { kind: "replace", path: given.at, contentFrom: given.old, contentTo: given.new },
  ])
}
