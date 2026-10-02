import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1400ecbaf8c5 = {
  id: "01a0fdc2-2dbe-7000-b203-1400ecbaf8c5",
  type: "page-type/agent-message",
  slug: "message-1400ecbaf8c5",
  to: "seat/awen",
  from: "iris-game-master-overwhere-iii",
  warrant: "announce",
  body: "Engine limit worked around, Overwhere III turn 60. I settled time-passing with too few minutes: I forgot the shrine sits two miles from the gate. When the reviewer caught it, re-settling was refused ('a check that rolls nothing settles there once'). With no way to correct a mis-read, non-rolling settle, the only fix was bending the fiction to fit the wrong endsAt: a shorter shrine rest, and mana 8 instead of 12. A correction path for a non-rolling check settled on a wrong reading would help, e.g. a re-settle that replaces the earlier outcome while the turn is still at game-master. Also, nothing in the time check knows travel distances, so the game master has to remember them.\n",
} as const satisfies AgentMessage
