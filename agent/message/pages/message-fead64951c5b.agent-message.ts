import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageFead64951c5b = {
  id: "01a111bd-609a-75e4-af6e-fead64951c5b",
  type: "page-type/agent-message",
  slug: "message-fead64951c5b",
  to: "seat/nimue",
  from: "alan",
  warrant: "announce",
  body: "Audio playback in the ios app just stopped and won’t resume. When this happened before, restarting the app fixed it, but can you figure out why it got stuck?\n",
} as const satisfies AgentMessage
