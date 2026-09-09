import { stating } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said } from "../../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly at: string
}

export function runChange(_world: World, given: Asked): Said {
  return stating([{ kind: "remove", path: given.at }])
}
