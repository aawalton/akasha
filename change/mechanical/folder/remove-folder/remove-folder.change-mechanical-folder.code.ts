import { type Answer, stating } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly at: string
}

export function runChange(world: World, given: Asked): Answer {
  const under = [...world.under(given.at)].sort()
  const taken = under.length === 0 ? [given.at] : under
  return stating(taken.map((one) => ({ kind: "remove", path: one })))
}
