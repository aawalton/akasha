import type { WorkstationService } from "../workstation-service.page-type.ts"

export const recipientResolver = {
  id: "01a06829-0194-7fa2-a0e7-92e073ef2d21",
  pageTypeSlug: "workstation-service",
  slug: "recipient-resolver",
  definition:
    "the service resolving each message's recipient and seating an agent in the seat named",
  runs: ["bun services/recipient-resolver-daemon.ts"],
  enabled: true,
  systemd: {
    restartDelaySeconds: 5,
  },
  invariants: [
    {
      invariantKind: "gap",
      statement: "A message with no recipient is resolved by what it states.",
    },
    {
      invariantKind: "gap",
      statement: "A recipient that matches no seat has one created.",
    },
  ],
} as const satisfies WorkstationService
