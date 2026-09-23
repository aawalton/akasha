import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message8505af0d2779 = {
  id: "01a0cca7-15a8-7000-bfc9-8505af0d2779",
  type: "page-type/agent-message",
  slug: "message-8505af0d2779",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "a run at 5469659bf3ebaf90d0a0f71920fef22d652b50ca over 1 check asked for by name found 1 check newly refusing.\n`page-matches-its-type` refused 1 time:\n  story/game/pages/the-tower/mechanic-runs/the-tower-run-039.game-mechanic-run.ts — `run-said` runs to 2001 characters, over the length of 2000\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies AgentMessage
