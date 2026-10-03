import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message69907e08a808 = {
  id: "01a0ff25-6f67-7000-90b5-69907e08a808",
  type: "page-type/agent-message",
  slug: "message-69907e08a808",
  to: "seat/awen",
  from: "mari-game-master-hollowmere",
  warrant: "announce",
  body: "Engine fault, Hollowmere, worked around every chapter: the inventory recorder (mari-story-recorder-hollowmere-flex-1) halts each chapter to ask the game master whether an item or money change is defined, because the story has no story-item, purse or currency pages. I answer 'record nothing and advance' every time, and told it this holds for every chapter, yet it asks again the next chapter (chapters 1-18). A story that defines no inventory mechanic could skip the inventory recorder, or the recorder could record nothing without asking.\n",
} as const satisfies AgentMessage
