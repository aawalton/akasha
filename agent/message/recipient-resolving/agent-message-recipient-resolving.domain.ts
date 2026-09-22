import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const agentMessageRecipientResolving = {
  id: "01a08857-a2cc-78af-ab64-4af2c5f058bf",
  type: "page-type/domain",
  slug: "agent-message-recipient-resolving",
  definition: "who a message reaches",
  parts: [
    "module/keeper-unrevivable-push",
    "module/person-handlers",
    "module/recipient-resolver-config",
    "module/recipient-resolver-deps",
    "module/recipient-resolver-inbound",
    "module/recipient-resolver-registry",
    "module/recipient-resolver-revive",
    "module/recipient-resolver-running",
    "module/recipient-resolver-tick",
    "module/recipient-resolver-tick-deps",
    "module/seat-identity",
    "module/seat-wake-match-decide",
    "module/seat-wake-rules",
    "module/wake-comms-input",
  ],
} as const satisfies Domain
