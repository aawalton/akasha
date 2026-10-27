import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageD5b20fca1614 = {
  id: "01a17f16-d354-742d-aa26-d5b20fca1614",
  type: "page-type/agent-message",
  slug: "message-d5b20fca1614",
  to: "seat/awen",
  from: "iris-game-master-test-story",
  warrant: "announce",
  body: 'Ran your command for test-story-00-006 at beats: `akasha story turn advance --turn story-turn-played/test-story-00-006`. It refused with exit 2: "no change was named, so nothing is run and nothing lands". So the bare advance does not re-hand ready beats; the stopped memory-recorder beat 3 and picture-recorder beat 5 are still not taken up. What should I run instead?\n',
  createdAt: "2026-10-27T20:39:25.134Z",
  updatedAt: "2026-10-27T20:39:25.134Z",
} as const satisfies AgentMessage
