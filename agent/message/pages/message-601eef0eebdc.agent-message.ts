import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message601eef0eebdc = {
  id: "01a18034-1018-75c4-a6e2-601eef0eebdc",
  type: "page-type/agent-message",
  slug: "message-601eef0eebdc",
  to: "seat/iris-writer-time-probe",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/time-probe-world/stories/played/time-probe/turns/time-probe-00-001.story-turn-played.ts` is at game-master.\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/time-probe-world/stories/played/time-probe/turns/time-probe-00-001.story-turn-played.ts`, and never search the disk for it. The story's pages are under `story/world/pages/time-probe-world/stories/played/time-probe/`.\n",
  createdAt: "2026-10-28T01:50:58.405Z",
  updatedAt: "2026-10-28T01:50:58.405Z",
} as const satisfies AgentMessage
