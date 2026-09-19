import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageF1df732ce306 = {
  id: "01a0bac6-b35d-7000-8ad9-f1df732ce306",
  type: "page-type/message",
  slug: "message-f1df732ce306",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 735cca3b94b665a648599147909800466ebe027b found 1 check nothing measured.\n`folder-matches-a-shape` went unmeasured:\n  check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.ts — the check `folder-matches-a-shape` died on SIGKILL apart, so it judged nothing —\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
