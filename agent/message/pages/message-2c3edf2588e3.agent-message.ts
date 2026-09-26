import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message2c3edf2588e3 = {
  id: "01a0ddb4-8129-7000-9de3-2c3edf2588e3",
  type: "page-type/agent-message",
  slug: "message-2c3edf2588e3",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: "1 piece(s) of Alan's mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- Apple <appleid@id.apple.com> — Your Apple Account information has been updated. [everything-else]\n\nEach rule's own `# Rule` section says what it asks; the mail is still in the inbox.\n",
} as const satisfies AgentMessage
