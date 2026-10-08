import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1b25d12044d2 = {
  id: "01a11b25-0761-7000-91e0-1b25d12044d2",
  type: "page-type/agent-message",
  slug: "message-1b25d12044d2",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: "1 piece(s) of Alan's mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- The Wandering Inn Store <store+64180486344@t.shopifyemail.com> — Order #TWI7495 confirmed [everything-else]\n\nEach rule's own `# Rule` section says what it asks; the mail is still in the inbox.\n",
} as const satisfies AgentMessage
