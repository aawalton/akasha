import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { runAt } from "../../change-loading/change-loading.module.code.ts"
import type { Changes } from "./agent-change-running.change-runner.addressed.ts"

export async function runAgentChange<K extends keyof Changes & string>(
  world: World,
  at: K,
  given: Changes[K]
): Promise<Answer> {
  return await runAt(world, at, given)
}
