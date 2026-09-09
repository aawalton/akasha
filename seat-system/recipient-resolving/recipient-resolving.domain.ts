import type { Domain } from "@akasha/domains/domain"

export const recipientResolving = {
  id: "01a08857-a2cc-78af-ab64-4af2c5f058bf",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "recipient-resolving",
  definition: "who a message reaches",
  parts: [
    "module/recipient-resolver-running",
    "module/recipient-resolver-config",
    "module/recipient-resolver-deps",
    "module/recipient-resolver-inbound",
    "module/recipient-resolver-registry",
    "module/recipient-resolver-revive",
    "module/recipient-resolver-tick",
    "module/recipient-resolver-tick-deps",
    "module/alert-recipient-decide",
    "module/blocked-principal-decide",
    "module/domain-lead-decide",
    "module/keeper-unrevivable-push",
    "module/person-handlers",
    "module/seat-identity",
    "module/seat-wake-match-decide",
    "module/seat-wake-rules",
    "module/wake-comms-input",
  ],
} as const satisfies Domain
