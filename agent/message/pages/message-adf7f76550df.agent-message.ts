import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageAdf7f76550df = {
  id: "01a1802c-101b-7319-ae19-adf7f76550df",
  type: "page-type/agent-message",
  slug: "message-adf7f76550df",
  to: "seat/iris-world-builder-test-story",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-015.story-turn-played.ts` is at game-master.\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/test-story/turns/test-story-00-015.story-turn-played.ts`, and never search the disk for it. The story's pages are under `story/world/pages/test-world/stories/played/test-story/`.\n",
  createdAt: "2026-10-28T01:42:14.147Z",
  updatedAt: "2026-10-28T01:42:14.147Z",
} as const satisfies AgentMessage
