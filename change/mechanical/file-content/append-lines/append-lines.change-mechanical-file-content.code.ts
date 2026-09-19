import { type Said, stating } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly at: string
  readonly content: string
}

export function runChange(_world: World, given: Asked): Said {
  return stating([{ kind: "append", path: given.at, content: given.content }])
}
