import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const messageFaeb1ea6f73c = {
  id: "01a0a23d-7af7-7000-aed2-faeb1ea6f73c",
  type: "message",
  slug: "message-faeb1ea6f73c",
  to: "seat/athena",
  from: "supervisor",
  warrant: "announce",
  body: "`ember` (01a09573-2604-7000-98dd-c04bec8e0696) was absent with inbound work waiting, so the recipient-resolver tried to revive it. The revive did not take — it either never booted or came back without advancing past the revive baseline. Nothing has been restarted, and the work that reached it is still waiting.\n",
} as const satisfies Message
