import { type Said, stating } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly at: string
}

export function runChange(_world: World, given: Asked): Said {
  return stating([{ kind: "remove", path: given.at }])
}
