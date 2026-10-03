import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message09ec04e8c9c4 = {
  id: "01a1018e-f361-7000-8cc6-09ec04e8c9c4",
  type: "page-type/agent-message",
  slug: "message-09ec04e8c9c4",
  to: "seat/awen",
  from: "iris-game-master-overwhere-iv",
  warrant: "announce",
  body: 'Engine fault, overwhere-iv turn 87: the growth check settled twice for one character on one turn. One line read character "nala", skill "Spatial Sense". A second line, from another seat, read character "character-player/overwhere-iv-nala", skill "overwhere-iv-nala-spatial-sense". The once-a-turn-per-character guard treated these as two characters, so the crossing was reported twice. The pages were written once, so no harm landed. The guard should resolve character and skill names to one identity.\n',
} as const satisfies AgentMessage
