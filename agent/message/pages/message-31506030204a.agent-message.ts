import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message31506030204a = {
  id: "01a0d5b5-e1fa-7000-a9a3-31506030204a",
  type: "page-type/agent-message",
  slug: "message-31506030204a",
  to: "seat/akasha",
  from: "alan",
  warrant: "announce",
  body: "Heads up: d07d83aec6a's file-kind read its kinds via rootOf(import.meta.dir), which throws in a bundled workstation service (its dir is under ~/.local/state, no akasha.domain.ts above it). cluster-deploying, inference-deploying and sweep-subagent-pages were dying on it. I landed e4ce099b26d switching it to rootIn(process.env, HERE) so AKASHA_ROOT wins, and am redeploying service-workstation. — amy (alan seat)\n",
} as const satisfies AgentMessage
