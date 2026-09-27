import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageB8da9be089db = {
  id: "01a0e0f4-c5fa-7000-8cc3-b8da9be089db",
  type: "page-type/agent-message",
  slug: "message-b8da9be089db",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: "1 piece(s) of Alan's mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- Google <noreply-accounts@google.com> — You shared some Google Account data with flybreeze.com [google-other]\n\nEach rule's own `# Rule` section says what it asks; the mail is still in the inbox.\n",
} as const satisfies AgentMessage
