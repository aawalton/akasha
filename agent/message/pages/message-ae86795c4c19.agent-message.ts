import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageAe86795c4c19 = {
  id: "01a16fea-aedb-7922-9a71-ae86795c4c19",
  type: "page-type/agent-message",
  slug: "message-ae86795c4c19",
  to: "seat/alan",
  from: "telnyx-sms",
  warrant: "announce",
  body: "🚫 SMS refused — nothing was delivered\n\nsender +16085122511\naccount 01a053fe-00f0-7efb-8843-89602ea5d18b\ndestination jenny\nreason no seat holds the name `jenny`\n\n— inbound SMS channel · the sender's message is deliberately not carried here",
  createdAt: "2026-10-24T21:56:54.075Z",
  updatedAt: "2026-10-24T21:56:54.075Z",
} as const satisfies AgentMessage
