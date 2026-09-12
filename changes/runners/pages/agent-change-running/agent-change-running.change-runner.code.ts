import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { runAt } from "akasha/changes/runners/modules/change-loading/change-loading.module.code.ts"
import type { Changes } from "akasha/changes/runners/pages/agent-change-running/agent-change-running.change-runner.addressed.ts"

export async function runAgentChange<K extends keyof Changes & string>(
  world: World,
  at: K,
  given: Changes[K]
): Promise<Answer> {
  return await runAt(world, at, given)
}
