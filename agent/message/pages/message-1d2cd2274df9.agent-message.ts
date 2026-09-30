import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message1d2cd2274df9 = {
  id: "01a0f10f-be90-7de5-bb82-1d2cd2274df9",
  type: "page-type/agent-message",
  slug: "message-1d2cd2274df9",
  to: "seat/iris",
  from: "alan",
  warrant: "announce",
  body: "Hmm, I’m traveling so I don’t have direct access to the computer. Can you initiate the login and then give me the link and I can complete it from my phone and pass back the code?\n",
} as const satisfies AgentMessage
