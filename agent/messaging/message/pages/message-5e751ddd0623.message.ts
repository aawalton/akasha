import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message5e751ddd0623 = {
  id: "01a0c4c4-5217-7000-a99f-5e751ddd0623",
  type: "page-type/message",
  slug: "message-5e751ddd0623",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 7883811de9d9ff2fc519b6a1c461be865cdba5c9 found 1 check newly refusing.\n`index-is-level-with-the-pages` refused 5 times:\n  seat/log-day/seat-log-day.page-type.referenced-by — the index entry for this file is in the index differing from what its page says\n  subagent/subagent.page-type.referenced-by — the index entry for this file is in the index differing from what its page says\n  agent/change-agent.page-type.referenced-by — the index entry for this file is in the index differing from what its page says\n  modules/answer/change-answer.module.referenced-by — the index entry for this file is in the index differing from what its page says\n  modules/shadow/change-shadow.module.referenced-by — the index entry for this file is in the index differing from what its page says\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
