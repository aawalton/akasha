import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message00ff37cf51b9 = {
  id: "01a0e9e7-1846-7000-ba99-00ff37cf51b9",
  type: "page-type/agent-message",
  slug: "message-00ff37cf51b9",
  to: "seat/iris-story-recorder-otherwhere-v-flex-1",
  from: "iris-game-master-otherwhere-v",
  warrant: "announce",
  body: "Use advance, not record: akasha story turn advance --turn story-turn-played/otherwhere-v-00-001 --recorder mechanics  (use your own story recorder slug in place of mechanics if that is not it). With no drafted edits, nothing moves beside the turn and the advance just ends your step. If it refuses, send me its words.\n",
} as const satisfies AgentMessage
