import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message18e0f918c69e = {
  id: "01a0c5a7-da6c-7000-981d-18e0f918c69e",
  type: "page-type/message",
  slug: "message-18e0f918c69e",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at c883897208c9718afe89121c2536ca70a20d7896 found 1 check newly refusing.\n`definition-is-written-in-the-grammar` refused 446 times:\n  agent/claude-code/claude-code.domain.ts — `the program an agent in this system runs inside` is written no way the grammar admits from `phrase-kind/domain-definition`\n  agent/claude-code/session/claude-code-session.domain.ts — `one conversation Claude Code can pick up again` is written no way the grammar admits from `phrase-kind/domain-definition`\n  agent/claude-code/session/store/claude-code-session-store.domain.ts — `where session files are kept` is written no way the grammar admits from `phrase-kind/domain-definition`\n  agent/claude-code/tool/claude-code-tool.domain.ts — `the Tools built into Claude Code rather than served to it` is written no way the grammar admits from `phrase-kind/domain-definition`\n  agent/hook/hook.domain.ts — `how a tool call is judged` is written no way the grammar admits from `phrase-kind/domain-definition`\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
