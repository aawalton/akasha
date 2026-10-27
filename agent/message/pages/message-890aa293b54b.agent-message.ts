import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message890aa293b54b = {
  id: "01a17efb-7b20-7692-b6c2-890aa293b54b",
  type: "page-type/agent-message",
  slug: "message-890aa293b54b",
  to: "seat/iris-game-master-test-story",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-005.story-turn-played.ts` is at game-master.\n\nThis turn came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-005.story-turn-played.issues.txt`, listing 1 fault\n",
  createdAt: "2026-10-27T20:09:33.166Z",
  updatedAt: "2026-10-27T20:09:33.166Z",
} as const satisfies AgentMessage
