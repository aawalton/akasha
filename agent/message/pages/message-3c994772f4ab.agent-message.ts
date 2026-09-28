import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message3c994772f4ab = {
  id: "01a0e9de-a988-7000-acbd-3c994772f4ab",
  type: "page-type/agent-message",
  slug: "message-3c994772f4ab",
  to: "seat/iris-story-recorder-otherwhere-iii-flex-2",
  from: "iris-game-master-otherwhere-iii",
  warrant: "announce",
  body: "Advance with `akasha story turn advance --turn story-turn-played/otherwhere-iii-00-001 --recorder memory` (advance, not record). Recording nothing is right; advance with no drafts.\n",
} as const satisfies AgentMessage
