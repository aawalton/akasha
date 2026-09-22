import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message4b7d84984549 = {
  id: "01a0c95d-6ac2-7000-bdff-4b7d84984549",
  type: "page-type/message",
  slug: "message-4b7d84984549",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 7685146c4756ab98a06aaa2618f364c04fb81107 found 1 check newly refusing.\n`page-matches-its-type` refused 1 time:\n  story/game/pages/the-tower/mechanic-runs/the-tower-run-039.game-mechanic-run.ts — `run-said` runs to 2001 characters, over the length of 2000\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
