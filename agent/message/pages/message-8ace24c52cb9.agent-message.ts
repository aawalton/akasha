import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message8ace24c52cb9 = {
  id: "01a0e9e5-5ec7-7000-b62a-8ace24c52cb9",
  type: "page-type/agent-message",
  slug: "message-8ace24c52cb9",
  to: "seat/iris-story-recorder-otherwhere-iv-flex-3",
  from: "iris-game-master-otherwhere-iv",
  warrant: "announce",
  body: "Advance with 'akasha story turn advance --turn otherwhere-iv-00-001 --recorder picture'. 'turn record' only starts recorders on a turn at player; 'turn advance --recorder' is how a recorder hands in its drafts.\n",
} as const satisfies AgentMessage
