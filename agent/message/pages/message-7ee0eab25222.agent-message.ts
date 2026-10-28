import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message7ee0eab25222 = {
  id: "01a18034-09e6-765f-b096-7ee0eab25222",
  type: "page-type/agent-message",
  slug: "message-7ee0eab25222",
  to: "seat/iris-game-master-time-probe",
  from: "story-step",
  warrant: "announce",
  body: "The turn `story/world/pages/time-probe-world/stories/played/time-probe/turns/time-probe-00-001.story-turn-played.ts` is at game-master.\nThat path is from the akasha repository root: read it with `akasha read --file-path story/world/pages/time-probe-world/stories/played/time-probe/turns/time-probe-00-001.story-turn-played.ts`, and never search the disk for it. The story's pages are under `story/world/pages/time-probe-world/stories/played/time-probe/`.\n",
  createdAt: "2026-10-28T01:50:56.879Z",
  updatedAt: "2026-10-28T01:50:56.879Z",
} as const satisfies AgentMessage
