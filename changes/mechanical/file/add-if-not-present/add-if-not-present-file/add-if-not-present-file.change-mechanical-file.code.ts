import { stating } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said } from "../../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly at: string
  readonly body: string
}

export function runChange(world: World, given: Asked): Said {
  const was = world.textOf(given.at)
  if (was === given.body) return stating([])
  if (was === null || was === "") {
    return stating([{ kind: "add", path: given.at, content: given.body }])
  }
  return stating([{ kind: "replace", path: given.at, contentFrom: was, contentTo: given.body }])
}
