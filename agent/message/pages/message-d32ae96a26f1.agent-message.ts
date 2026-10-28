import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageD32ae96a26f1 = {
  id: "01a17ff2-4cd4-7534-ab89-d32ae96a26f1",
  type: "page-type/agent-message",
  slug: "message-d32ae96a26f1",
  to: "seat/iris-game-master-beat-flow-test",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-004.story-turn-played.ts` is at game-master.\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-004.story-turn-played.ts`, and never search the disk for it. The story's pages are under `story/world/pages/test-world/stories/played/beat-flow-test/`.\n",
  createdAt: "2026-10-28T00:39:08.979Z",
  updatedAt: "2026-10-28T00:39:08.979Z",
} as const satisfies AgentMessage
