import type { WorkstationService } from "../workstation-service.page-type.ts"

export const recipientResolver = {
  id: "01a06829-0194-7fa2-a0e7-92e073ef2d21",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "recipient-resolver",
  definition:
    "the service resolving each message's recipient and seating an agent in the seat named",
  runs: [
    "bun seat-system/recipient-resolving/recipient-resolver-running/recipient-resolver-running.module.code.ts",
  ],
  enabled: true,
  systemd: {
    restartDelaySeconds: 5,
  },
  invariants: [
    {
      invariantKind: "gap",
      statement: "A message with no recipient is resolved by the values that message states.",
    },
    {
      invariantKind: "gap",
      statement: "A recipient that matches no seat has a seat created.",
    },
  ],
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
} as const satisfies WorkstationService
