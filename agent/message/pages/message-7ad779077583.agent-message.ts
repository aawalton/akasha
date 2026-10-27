import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7ad779077583 = {
  id: "01a17efc-170f-7304-affa-7ad779077583",
  type: "page-type/agent-message",
  slug: "message-7ad779077583",
  to: "seat/iris-game-master-test-story",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-005.story-turn-played.ts` is at writer.\n\nThis turn came back for repair, not to be made again: mend each fault where it lands and keep the rest as it is. The faults are in the file beside it:\n- `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-005.story-turn-played.issues.txt`, listing 1 fault\n",
  createdAt: "2026-10-27T20:10:13.190Z",
  updatedAt: "2026-10-27T20:10:13.190Z",
} as const satisfies AgentMessage
