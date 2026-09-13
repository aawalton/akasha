import { stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly at: string
}

export function runChange(world: World, given: Asked): Answer {
  const under = [...world.under(given.at)].sort()
  const taken = under.length === 0 ? [given.at] : under
  return stating(taken.map((one) => ({ kind: "remove", path: one })))
}
