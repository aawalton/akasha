import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message01ee78d557cd = {
  id: "01a0aa7e-e160-7000-a358-01ee78d557cd",
  type: "page-type/message",
  slug: "message-01ee78d557cd",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: "1 piece(s) of Alan's mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- portal@telnyx.com — [Telnyx LLC] Payment Failed [everything-else]\n\nEach rule's own `# Rule` section says what it asks; the mail is still in the inbox.\n",
} as const satisfies Message
