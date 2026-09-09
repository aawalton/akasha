import type { WorkstationService } from "../workstation-service.page-type.ts"

export const personaPointsRebuilding = {
  id: "01a082eb-b037-7fe2-b2ad-f45181c80cb2",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "persona-points-rebuilding",
  definition: "the service working out each persona's points again once a day has opened",
  runs: ["bun alan/harness/persona-points-rebuilding/persona-points-rebuilding.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*-*-* 04:10:00",
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
    {
      invariantKind: "departure",
      statement:
        "Without this run a day turning would leave each persona with today's count alone.",
    },
  ],
} as const satisfies WorkstationService
