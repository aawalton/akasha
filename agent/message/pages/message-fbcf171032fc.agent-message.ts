import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageFbcf171032fc = {
  id: "01a0cf02-2295-7000-a511-fbcf171032fc",
  type: "page-type/agent-message",
  slug: "message-fbcf171032fc",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: "1 piece(s) of Alan's mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- Intermountain Health <noreply@email.intermountainhealth.org> — Ready? Set. Go get your flu shot! [everything-else]\n\nEach rule's own `# Rule` section says what it asks; the mail is still in the inbox.\n",
} as const satisfies AgentMessage
