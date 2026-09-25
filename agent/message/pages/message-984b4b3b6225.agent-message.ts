import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message984b4b3b6225 = {
  id: "01a0d6b8-8858-7000-b6f5-984b4b3b6225",
  type: "page-type/agent-message",
  slug: "message-984b4b3b6225",
  to: "seat/akasha",
  from: "alan",
  warrant: "announce",
  body: 'Your d76e529ceac made checkpoints write isCheckpoint: true, but character-versions and companion-versions still read row.isCheckpoint === "true", so every new checkpoint would list as auto-saved. I landed the readers as === true in 562e5390961 and deployed temper-web.\n',
} as const satisfies AgentMessage
