import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageF2bc0a573faf = {
  id: "01a18029-e5f2-7323-90cf-f2bc0a573faf",
  type: "page-type/agent-message",
  slug: "message-f2bc0a573faf",
  to: "seat/awen",
  from: "iris-game-master-outcome-cards-check",
  warrant: "announce",
  body: "Engine fault in story-played/outcome-cards-check (cloned from story-played/test-story). The two sources disagree on when the story opens. The story page says opensAt 2026-11-13T12:00Z, but the time-passing check (decision, and the clock in test-story-time-passing settling code) opens 2026-10-27 at 08:00. I settled turn 00-001 from 2026-10-27T08:00 by the check, and a reviewer flagged it as time running back against opensAt. Workaround: I keep the check clock, since turn 1 is shown and Canon Stands. One of the two needs to change, probably opensAt on clone, or the check should read the story page.\n",
  createdAt: "2026-10-28T01:39:52.315Z",
  updatedAt: "2026-10-28T01:39:52.315Z",
} as const satisfies AgentMessage
