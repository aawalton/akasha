import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message2e9d2ecc80bb = {
  id: "01a1170b-27d0-7000-a533-2e9d2ecc80bb",
  type: "page-type/agent-message",
  slug: "message-2e9d2ecc80bb",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: "1 piece(s) of Alan's mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- \"Amazon.com\" <no-reply@amazon.com> — Delivery estimate update for your Amazon order ‎#112-5795322-2251429‎ [amazon-other]\n\nEach rule's own `# Rule` section says what it asks; the mail is still in the inbox.\n",
} as const satisfies AgentMessage
