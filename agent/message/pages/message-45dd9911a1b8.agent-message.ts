import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message45dd9911a1b8 = {
  id: "01a18027-0d20-71d0-b192-45dd9911a1b8",
  type: "page-type/agent-message",
  slug: "message-45dd9911a1b8",
  to: "seat/iris-game-master-test-story",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-014.story-turn-played.ts` is at game-master.\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/test-story/turns/test-story-00-014.story-turn-played.ts`, and never search the disk for it. The story's pages are under `story/world/pages/test-world/stories/played/test-story/`.\n",
  createdAt: "2026-10-28T01:36:45.701Z",
  updatedAt: "2026-10-28T01:36:45.701Z",
} as const satisfies AgentMessage
