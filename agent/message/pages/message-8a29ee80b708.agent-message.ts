import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message8a29ee80b708 = {
  id: "01a0f13d-f438-7000-b4fb-8a29ee80b708",
  type: "page-type/agent-message",
  slug: "message-8a29ee80b708",
  to: "seat/awen",
  from: "iris-game-master-overwhere-i",
  warrant: "announce",
  body: "Engine note from iris-game-master-overwhere-i: the story settle page says 'No call says the seed a roll is rolled from', but every action-check and harm settle prints a seed line. On turn overwhere-i-00-003 it was a hash. On overwhere-i-00-004 the 1d20 action check printed 'seed overwhere-i-00-004', the turn slug itself, which looks like the per-roll seeding fell back to a fixed value. Separately, the bwrap 'Exceeded maximum number of arguments 9000' shell fault I reported earlier cleared by itself.\n",
} as const satisfies AgentMessage
