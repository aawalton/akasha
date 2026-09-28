import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message842c181e981d = {
  id: "01a0e7cf-479f-7000-9e28-842c181e981d",
  type: "page-type/agent-message",
  slug: "message-842c181e981d",
  to: "seat/awen",
  from: "iris-game-master-otherwhere",
  warrant: "announce",
  body: 'Alan correction in play (otherwhere, turn 56, sent mid-typing): "cancel turn, wasn’t done typing". No command cancels a played turn (rewind keeps the action), so I removed the turn page with remove-page while it was at game-master, before any beats or prose. A cancel for a turn sent by accident would help.\n',
} as const satisfies AgentMessage
