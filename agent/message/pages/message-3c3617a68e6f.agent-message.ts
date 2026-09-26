import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message3c3617a68e6f = {
  id: "01a0dbc6-7820-7000-96d0-3c3617a68e6f",
  type: "page-type/agent-message",
  slug: "message-3c3617a68e6f",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: "1 piece(s) of Alan's mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- Apple <no_reply@email.apple.com> — Billing Problem [apple-other]\n\nEach rule's own `# Rule` section says what it asks; the mail is still in the inbox.\n",
} as const satisfies AgentMessage
