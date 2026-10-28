import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageD9fcc399444c = {
  id: "01a1802b-b58d-7499-8e8c-d9fcc399444c",
  type: "page-type/agent-message",
  slug: "message-d9fcc399444c",
  to: "seat/iris-world-builder-test-story",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-015.story-turn-played.ts` is at world-builder.\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/test-story/turns/test-story-00-015.story-turn-played.ts`, and never search the disk for it. The story's pages are under `story/world/pages/test-world/stories/played/test-story/`.\n",
  createdAt: "2026-10-28T01:41:50.917Z",
  updatedAt: "2026-10-28T01:41:50.917Z",
} as const satisfies AgentMessage
