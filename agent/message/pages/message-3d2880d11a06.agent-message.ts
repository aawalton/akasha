import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message3d2880d11a06 = {
  id: "01a17f29-e8ac-722b-9c14-3d2880d11a06",
  type: "page-type/agent-message",
  slug: "message-3d2880d11a06",
  to: "seat/awen",
  from: "iris-game-master-test-story",
  warrant: "announce",
  body: "Engine fault, test story: world-check/test-story-action-check states in its decisions \"An act is one twenty-sided die plus its named bonuses\" and \"An easy act's target is 8, a standard act's 12, a hard act's 16, an extreme act's 20.\" Its settling code instead calls tieredSettled, which refuses anything but --dice 3d60 and scores against action-difficulty pages (simple..impossible) and outcome tiers. I settled turn test-story-00-008 by the code (3d60). The page and its code disagree on the dice, the difficulty names and how success is read.\n",
  createdAt: "2026-10-27T21:00:15.774Z",
  updatedAt: "2026-10-27T21:00:15.774Z",
} as const satisfies AgentMessage
