import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message6434447e71bf = {
  id: "01a0fdaf-2585-7000-8073-6434447e71bf",
  type: "page-type/agent-message",
  slug: "message-6434447e71bf",
  to: "seat/awen",
  from: "iris-game-master-overwhere-iii",
  warrant: "announce",
  body: "Engine limit worked around, Overwhere III turn 59. The action check refuses any bonus above 4 ('Too big: expected number to be <=4' at bonuses[].by). Nala's Mana Weaver reached rank 5 (Legend), and the established reading is Mana Weaver adding its rank, so the right bonus is +5. I settled at +4. Either the cap should allow a trait's top rank (5 here), or the check should say how a rank above 4 counts.\n",
} as const satisfies AgentMessage
