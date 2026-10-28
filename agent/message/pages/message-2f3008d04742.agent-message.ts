import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message2f3008d04742 = {
  id: "01a1802c-81dd-75e2-a369-2f3008d04742",
  type: "page-type/agent-message",
  slug: "message-2f3008d04742",
  to: "seat/iris-writer-test-story",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/test-world/stories/played/test-story/turns/test-story-00-014.story-turn-played.ts` is at player.\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/test-story/turns/test-story-00-014.story-turn-played.ts`, and never search the disk for it. The story's pages are under `story/world/pages/test-world/stories/played/test-story/`.\n",
  createdAt: "2026-10-28T01:42:43.237Z",
  updatedAt: "2026-10-28T01:42:43.237Z",
} as const satisfies AgentMessage
