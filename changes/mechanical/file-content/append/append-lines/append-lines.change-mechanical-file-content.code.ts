import { stating } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said } from "../../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly at: string
  readonly content: string
}

export function runChange(_world: World, given: Asked): Said {
  return stating([{ kind: "append", path: given.at, content: given.content }])
}
