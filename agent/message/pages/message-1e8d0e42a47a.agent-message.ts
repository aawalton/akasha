import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1e8d0e42a47a = {
  id: "01a18026-6176-7424-a22b-1e8d0e42a47a",
  type: "page-type/agent-message",
  slug: "message-1e8d0e42a47a",
  to: "seat/iris-game-master-test-story",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-014.story-turn-played.ts` is at world-builder.\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/test-story/turns/test-story-00-014.story-turn-played.ts`, and never search the disk for it. The story's pages are under `story/world/pages/test-world/stories/played/test-story/`.\n",
  createdAt: "2026-10-28T01:36:01.956Z",
  updatedAt: "2026-10-28T01:36:01.956Z",
} as const satisfies AgentMessage
