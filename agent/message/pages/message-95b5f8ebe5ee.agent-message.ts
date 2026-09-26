import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message95b5f8ebe5ee = {
  id: "01a0dd6b-f1f6-7000-9436-95b5f8ebe5ee",
  type: "page-type/agent-message",
  slug: "message-95b5f8ebe5ee",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: "2 piece(s) of Alan's mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- Better <noreply@better-comms.org.uk> — Welcome to Better! Your membership has been created... [everything-else]\n- Better <noreply@better-comms.org.uk> — Confirmation of the set-up of your Direct Debit Instruction [everything-else]\n\nEach rule's own `# Rule` section says what it asks; the mail is still in the inbox.\n",
} as const satisfies AgentMessage
