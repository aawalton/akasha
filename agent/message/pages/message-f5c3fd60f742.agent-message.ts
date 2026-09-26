import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF5c3fd60f742 = {
  id: "01a0ddb5-76e1-7000-8459-f5c3fd60f742",
  type: "page-type/agent-message",
  slug: "message-f5c3fd60f742",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: "1 piece(s) of Alan's mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- Apple <appleid@id.apple.com> — Your Apple Account information has been updated. [everything-else]\n\nEach rule's own `# Rule` section says what it asks; the mail is still in the inbox.\n",
} as const satisfies AgentMessage
