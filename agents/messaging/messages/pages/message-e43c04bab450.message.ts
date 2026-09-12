import type { Message } from "akasha/agents/messaging/messages/message.page-type.types.ts"

export const messageE43c04bab450 = {
  id: "01a09585-10e6-7000-ad5a-e43c04bab450",
  type: "message",
  slug: "message-e43c04bab450",
  to: "thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at f03f76377abf78bac808a2d153c2e20b030829f9 found 1 check newly refusing.\n`index-is-level-with-the-pages` refused 2 times:\n  seat-system/subagents/subagent.page-type.types.ts — the index entry for this file is in the index differing from what its page says\n  commands/pages/page/secret/show/page-secret-show.command.code.ts — the index entry for this file is in the index and named by no page\n/var/home/walton/.local/state/workstation-services/audit-verdicts.json holds what each of them refuses, whole.\n",
} as const satisfies Message
