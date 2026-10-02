import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA24eb7e6f34e = {
  id: "01a0fe3e-d134-7000-b89e-a24eb7e6f34e",
  type: "page-type/agent-message",
  slug: "message-a24eb7e6f34e",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: "1 piece(s) of Alan's mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- Stripe <notifications@stripe.com> — Updates to Stripe’s legal terms and Privacy Policy [everything-else]\n\nEach rule's own `# Rule` section says what it asks; the mail is still in the inbox.\n",
} as const satisfies AgentMessage
