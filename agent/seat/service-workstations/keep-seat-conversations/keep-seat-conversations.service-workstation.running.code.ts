import { watchConversations } from "akasha/agent/seat/observation/modules/conversation-keeping/conversation-keeping.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const NEVER: Promise<never> = new Promise(() => {})

export async function runService(): Promise<never> {
  watchConversations(akashaRoot())
  return await NEVER
}
