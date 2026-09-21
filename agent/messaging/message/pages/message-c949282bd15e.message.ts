import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageC949282bd15e = {
  id: "01a0c495-0dd4-7000-95f2-c949282bd15e",
  type: "page-type/message",
  slug: "message-c949282bd15e",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at fd1dc7e0787eee0f91b0249ec419515572307328 found 1 check newly refusing and 1 check nothing measured.\n`index-is-level-with-the-pages` refused 1 time:\n  decision-kind/pages/constraint.decision-kind.referenced-by — the index entry for this file is in the index differing from what its page says\n`folder-matches-a-shape` went unmeasured:\n  check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.ts — the check `folder-matches-a-shape` died on SIGKILL apart, so it judged nothing —\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
