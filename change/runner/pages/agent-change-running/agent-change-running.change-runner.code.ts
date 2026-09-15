import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { runAt } from "akasha/change/runner/modules/change-loading/change-loading.module.code.ts"
import type { Changes } from "akasha/change/runner/pages/agent-change-running/agent-change-running.change-runner.addressed.ts"

export type Asking = {
  [K in keyof Changes]: { readonly at: K; readonly given: Changes[K] }
}[keyof Changes]

export async function runAgentChange<K extends keyof Changes & string>(
  world: World,
  at: K,
  given: Changes[K]
): Promise<Answer> {
  return await runAt(world, at, given)
}
