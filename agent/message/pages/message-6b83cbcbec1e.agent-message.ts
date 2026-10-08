import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message6b83cbcbec1e = {
  id: "01a11b2b-382b-7835-8327-6b83cbcbec1e",
  type: "page-type/agent-message",
  slug: "message-6b83cbcbec1e",
  to: "seat/nimue",
  from: "alan",
  warrant: "announce",
  body: "Rather than a separate page, I’d like to build it into the seat page. What should the architecture be for the live voice model on top of the seat?\n",
} as const satisfies AgentMessage
