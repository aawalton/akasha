import { loadedAt } from "akasha/change/runner/modules/change-loading/change-loading.module.code.ts"
import type { Changes } from "akasha/change/runner/pages/agent-change-running/agent-change-running.change-runner.addressed.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type Applying,
  type Chosen,
  changing,
} from "akasha/command/modules/change-running/change-running.module.code.ts"
import type { Piping } from "akasha/command/modules/piping/piping.module.code.ts"

export type Asking = {
  [K in keyof Changes]: { readonly at: K; readonly given: Changes[K] }
}[keyof Changes]

export async function runAgentChange(
  root: string,
  page: string,
  agentId: string | null,
  slug: string | undefined,
  piping: Piping,
  applying: Applying,
  chosen: Chosen,
  done: string[] = []
): Promise<Answer> {
  return await changing(root, page, agentId, slug, piping, loadedAt, applying, chosen, done)
}
