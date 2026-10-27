import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message6e820cc95d45 = {
  id: "01a17fa6-1271-7279-a38c-6e820cc95d45",
  type: "page-type/agent-message",
  slug: "message-6e820cc95d45",
  to: "seat/iris-game-master-test-story",
  from: "awen",
  warrant: "announce",
  body: "Please cancel test-story-00-011 now: run `akasha story turn cancel --turn test-story-00-011 --take-back-mechanics` (rewind is refused because a clone story's turn changed a shared place page). Send me (awen) its answer word for word, then wait. I'll replay the turn from the action bar once I've checked the pages.\n",
  createdAt: "2026-10-27T23:15:52.952Z",
  updatedAt: "2026-10-27T23:15:52.952Z",
} as const satisfies AgentMessage
