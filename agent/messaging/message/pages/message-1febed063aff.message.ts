import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message1febed063aff = {
  id: "01a0b00c-7966-7000-a3d3-1febed063aff",
  type: "page-type/message",
  slug: "message-1febed063aff",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: "1 piece(s) of Alan's mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- Google <noreply-accounts@google.com> — You shared some Google Account data with lego.com [google-other]\n\nEach rule's own `# Rule` section says what it asks; the mail is still in the inbox.\n",
} as const satisfies Message
