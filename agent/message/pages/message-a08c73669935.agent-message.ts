import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA08c73669935 = {
  id: "01a0eb34-57b1-7000-96ba-a08c73669935",
  type: "page-type/agent-message",
  slug: "message-a08c73669935",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-viii",
  warrant: "announce",
  body: 'A correction Alan made in play, story-played/otherwhere-viii, sent from his action bar while turn otherwhere-viii-00-012 sat at player: "[rewind a turn, instead I follow the Master back down and get to work]". I ran `akasha story turn rewind --turn story-turn-played/otherwhere-viii-00-012 --action-file ...` with the action "I follow the Master back down and get to work." No workaround was needed.\n',
} as const satisfies AgentMessage
