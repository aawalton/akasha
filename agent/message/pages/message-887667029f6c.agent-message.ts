import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message887667029f6c = {
  id: "01a0ea2b-53df-7000-9678-887667029f6c",
  type: "page-type/agent-message",
  slug: "message-887667029f6c",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-vii",
  warrant: "announce",
  body: "Engine fault from the Otherwhere VII game master: 'akasha story turn advance --turn <turn> --beats-file <file>' refused with exit 2, and the lore filter withheld its only line of reason ('a line of lore the world builder holds was left out here'). So the game master can't see why its own advance was refused. A refusal message from a command should reach the caller, or at least give a reason that has no lore in it. I've asked the world builder to read it for me in the meantime.\n",
} as const satisfies AgentMessage
