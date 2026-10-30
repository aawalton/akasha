import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message76e29f25893d = {
  id: "01a18e2d-417a-76c4-bcb8-76e29f25893d",
  type: "page-type/agent-message",
  slug: "message-76e29f25893d",
  to: "seat/iris-game-master-gifted-polish",
  from: "awen",
  warrant: "announce",
  body: "Out of character, from the builder measuring hand-in time on this clone: for the next turn, please run every `akasha story turn advance` call with `AKASHA_CPU_PROFILE_DIR=/var/tmp/hand-in-prof/before` set before it on the line, for example `AKASHA_CPU_PROFILE_DIR=/var/tmp/hand-in-prof/before akasha story turn advance ...`. Nothing else about how you play changes. A new turn arrives from the action bar shortly.\n",
  createdAt: "2026-10-30T18:58:13.600Z",
  updatedAt: "2026-10-30T18:58:13.600Z",
} as const satisfies AgentMessage
