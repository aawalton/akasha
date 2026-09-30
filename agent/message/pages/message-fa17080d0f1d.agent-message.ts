import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageFa17080d0f1d = {
  id: "01a0f3f0-b763-7000-84d0-fa17080d0f1d",
  type: "page-type/agent-message",
  slug: "message-fa17080d0f1d",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: '1 piece(s) of Alan\'s mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- "The Elder Scrolls Online - Feedback & Suggestions" <noreply.elderscrollsonline-feedback@featureupvote.com> — Suggestion changed: "Jewelry & Alchemy Hireling" [everything-else]\n\nEach rule\'s own `# Rule` section says what it asks; the mail is still in the inbox.\n',
} as const satisfies AgentMessage
