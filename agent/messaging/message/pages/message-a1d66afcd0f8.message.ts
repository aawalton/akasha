import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageA1d66afcd0f8 = {
  id: "01a0c22b-6347-7000-94ce-a1d66afcd0f8",
  type: "page-type/message",
  slug: "message-a1d66afcd0f8",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: "1 piece(s) of Alan's mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- \"return@amazon.com\" <return@amazon.com> — Your refund confirmation [amazon-other]\n\nEach rule's own `# Rule` section says what it asks; the mail is still in the inbox.\n",
} as const satisfies Message
