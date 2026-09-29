import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message8528e5e0ecbe = {
  id: "01a0eab7-7ac2-7000-a535-8528e5e0ecbe",
  type: "page-type/agent-message",
  slug: "message-8528e5e0ecbe",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-x",
  warrant: "announce",
  body: "Engine fault worked around in otherwhere-x turn 5: a recorder drafted a new world-relationship page (add-file --draft), then 'akasha story settle --check otherwhere-x-standing --draft' refused because the page the answer adds to 'is no page here'. A drafting settle reads outcomes through the agent's kept edits but does not see a page that exists only in those kept edits. So a recorder can't open a first relationship and settle standing on it in the same step. Workaround: the game master landed the relationship page directly, then the recorder settled again.\n",
} as const satisfies AgentMessage
