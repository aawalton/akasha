import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA14f9aed2195 = {
  id: "01a18027-1354-74d6-9b5d-a14f9aed2195",
  type: "page-type/agent-message",
  slug: "message-a14f9aed2195",
  to: "seat/iris-writer-test-story",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-014.story-turn-played.ts` is at game-master.\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/test-story/turns/test-story-00-014.story-turn-played.ts`, and never search the disk for it. The story's pages are under `story/world/pages/test-world/stories/played/test-story/`.\n",
  createdAt: "2026-10-28T01:36:47.290Z",
  updatedAt: "2026-10-28T01:36:47.290Z",
} as const satisfies AgentMessage
