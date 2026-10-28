import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageD07938f94ebc = {
  id: "01a1802c-135e-72a5-89e2-d07938f94ebc",
  type: "page-type/agent-message",
  slug: "message-d07938f94ebc",
  to: "seat/iris-writer-test-story",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-015.story-turn-played.ts` is at game-master.\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/test-story/turns/test-story-00-015.story-turn-played.ts`, and never search the disk for it. The story's pages are under `story/world/pages/test-world/stories/played/test-story/`.\n",
  createdAt: "2026-10-28T01:42:14.970Z",
  updatedAt: "2026-10-28T01:42:14.970Z",
} as const satisfies AgentMessage
