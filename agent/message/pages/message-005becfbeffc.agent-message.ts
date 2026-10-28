import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message005becfbeffc = {
  id: "01a17ff1-1e1b-70c3-a9a7-005becfbeffc",
  type: "page-type/agent-message",
  slug: "message-005becfbeffc",
  to: "seat/iris-game-master-beat-flow-test",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-004.story-turn-played.ts` is at world-builder.\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/test-world/stories/played/beat-flow-test/turns/beat-flow-test-00-004.story-turn-played.ts`, and never search the disk for it. The story's pages are under `story/world/pages/test-world/stories/played/beat-flow-test/`.\n",
  createdAt: "2026-10-28T00:37:51.211Z",
  updatedAt: "2026-10-28T00:37:51.211Z",
} as const satisfies AgentMessage
