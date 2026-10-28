import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageE84302811f58 = {
  id: "01a18030-b802-753f-94b9-e84302811f58",
  type: "page-type/agent-message",
  slug: "message-e84302811f58",
  to: "seat/iris-writer-test-story",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-015.story-turn-played.ts` is at player.\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/test-story/turns/test-story-00-015.story-turn-played.ts`, and never search the disk for it. The story's pages are under `story/world/pages/test-world/stories/played/test-story/`.\n",
  createdAt: "2026-10-28T01:47:19.231Z",
  updatedAt: "2026-10-28T01:47:19.231Z",
} as const satisfies AgentMessage
