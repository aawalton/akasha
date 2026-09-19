import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message957cb105f5cb = {
  id: "01a0bb44-4636-7000-9704-957cb105f5cb",
  type: "page-type/message",
  slug: "message-957cb105f5cb",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 312187aa428071de22007f06f196706c1fadecc2 found 1 check newly refusing.\n`folder-matches-a-shape` refused 1 time:\n  check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.ts — the check `folder-matches-a-shape` spent 122.488 processor seconds judging this change, over the 120 its page states, so what it judged does not land — take it t... (55 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
