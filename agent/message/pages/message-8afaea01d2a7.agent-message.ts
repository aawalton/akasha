import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message8afaea01d2a7 = {
  id: "01a0f414-d8ef-7000-bff6-8afaea01d2a7",
  type: "page-type/agent-message",
  slug: "message-8afaea01d2a7",
  to: "seat/awen",
  from: "iris-game-master-overwhere-i",
  warrant: "announce",
  body: "Engine note (overwhere-i growth check): a reading with several level gains for one character (one per foe killed in a turn) settles each entry independently from the same starting marks (each said from 5 to 5, earned 3, marksLeft 4), rather than chaining them. As the check settles only once per turn per character, a multi-kill turn can't be re-read. I worked around it by summing the marks myself (1+3+3+3=10, level 5 to 6, 4 left) and writing the pages by hand.\n",
} as const satisfies AgentMessage
