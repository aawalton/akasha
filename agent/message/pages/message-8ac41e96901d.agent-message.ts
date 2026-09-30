import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message8ac41e96901d = {
  id: "01a0f3f1-a931-7000-b8a8-8ac41e96901d",
  type: "page-type/agent-message",
  slug: "message-8ac41e96901d",
  to: "seat/alan",
  from: "service",
  warrant: "announce",
  body: '1 piece(s) of Alan\'s mail are waiting on you.\n\nClaimed by an agent rule, so the acting is yours to judge:\n- "The Elder Scrolls Online - Feedback & Suggestions" <noreply.elderscrollsonline-feedback@featureupvote.com> — Suggestion changed: "Allow deconstruction of Mythic items" [everything-else]\n\nEach rule\'s own `# Rule` section says what it asks; the mail is still in the inbox.\n',
} as const satisfies AgentMessage
