import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA2eeb8811cf9 = {
  id: "01a17eef-3cdc-742d-b176-a2eeb8811cf9",
  type: "page-type/agent-message",
  slug: "message-a2eeb8811cf9",
  to: "seat/iris-game-master-test-story",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-005.story-turn-played.ts` is at game-master.\n\nThis turn came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-005.story-turn-played.mechanics-issues.txt`, listing 1 fault\n",
  createdAt: "2026-10-27T19:56:11.133Z",
  updatedAt: "2026-10-27T19:56:11.133Z",
} as const satisfies AgentMessage
