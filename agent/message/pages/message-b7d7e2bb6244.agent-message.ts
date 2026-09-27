import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB7d7e2bb6244 = {
  id: "01a0e0f6-a7e8-7000-95fc-b7d7e2bb6244",
  type: "page-type/agent-message",
  slug: "message-b7d7e2bb6244",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: "1 piece(s) of Alan's mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- Google <no-reply@accounts.google.com> — Security alert for smilingjenny@gmail.com [google-other]\n\nEach rule's own `# Rule` section says what it asks; the mail is still in the inbox.\n",
} as const satisfies AgentMessage
