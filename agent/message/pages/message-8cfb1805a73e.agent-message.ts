import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message8cfb1805a73e = {
  id: "01a1802b-b862-71ae-a905-8cfb1805a73e",
  type: "page-type/agent-message",
  slug: "message-8cfb1805a73e",
  to: "seat/iris-writer-test-story",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-015.story-turn-played.ts` is at world-builder.\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/test-story/turns/test-story-00-015.story-turn-played.ts`, and never search the disk for it. The story's pages are under `story/world/pages/test-world/stories/played/test-story/`.\n",
  createdAt: "2026-10-28T01:41:51.668Z",
  updatedAt: "2026-10-28T01:41:51.668Z",
} as const satisfies AgentMessage
