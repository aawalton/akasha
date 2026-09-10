import type { WorkstationService } from "../workstation-service.page-type.types.ts"

export const overdueRolling = {
  id: "01a07959-e7b3-7474-b7d6-6b2d76b1b642",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "overdue-rolling",
  definition: "the service moving every overdue to-do onto the day that has just opened",
  runs: ["bun alan/harness/overdue-rolling/overdue-rolling.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*-*-* 04:05:00",
    catchUp: true,
    startTimeoutSeconds: 600,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "The timer fires after the day has opened rather than as the day opens.",
    },
    {
      invariantKind: "departure",
      statement: "Four in the morning in Denver is six in the morning in New York all year.",
    },
    {
      invariantKind: "departure",
      statement: "A run missed while the workstation was off runs when the workstation is back.",
    },
  ],
} as const satisfies WorkstationService
