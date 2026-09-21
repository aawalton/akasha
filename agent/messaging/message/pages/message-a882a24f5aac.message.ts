import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageA882a24f5aac = {
  id: "01a0c53a-eb7e-7000-906d-a882a24f5aac",
  type: "page-type/message",
  slug: "message-a882a24f5aac",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at e25cb3d012c995a31118c35b2e57c320e55807b0 found 1 check newly refusing.\n`folder-matches-a-shape` refused 1 time:\n  check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.ts — the check `folder-matches-a-shape` spent 126.498 processor seconds judging this change, over the 120 its page states, so what it judged does not land — take it t... (55 characters more)\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
