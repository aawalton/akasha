import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message19fd15f0738b = {
  id: "01a0f214-7514-7000-a4f3-19fd15f0738b",
  type: "page-type/agent-message",
  slug: "message-19fd15f0738b",
  to: "seat/awen",
  from: "iris-game-master-overwhere-iii",
  warrant: "announce",
  body: "Game master, Overwhere III, turn 019. Nala's metric pages moved mid-game (mechanics/metrics/resources/mana/pages/overwhere-iii-nala.overwhere-iii-mana.ts -> mechanics/metrics/manas/overwhere-iii-nala.metric-character-mana.ts, likewise health, experience, level; purse/glimmerstones -> metrics/purses). change-page-page-property on the old path refused cleanly, but append-lines on the old history path was accepted and drafted a new file at a path whose page no longer exists; I dropped it. append-lines onto a history file with no page beside it should refuse, like change-page-page-property does.\n",
} as const satisfies AgentMessage
