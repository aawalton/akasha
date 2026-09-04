import type { WorkstationService } from "../workstation-service.page-type.ts"

export const rulePopulationSweep = {
  id: "01a06829-0194-7b8c-9039-c87bd15e1955",
  pageTypeSlug: "workstation-service",
  slug: "rule-population-sweep",
  definition: "the service reading what every enforcement rule weighed and filing it for `dalla`",
  runs: [
    "bun akasha/rule-population/rule-population-sweeping/rule-population-sweeping.module.code.ts",
  ],
  enabled: true,
  systemd: {
    schedule: "*-*-* 09:53:00",
    jitterSeconds: 60,
    catchUp: true,
    startTimeoutSeconds: 1800,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A rule's population is what it weighed, never what it found, the two meeting at zero.",
    },
    {
      invariantKind: "departure",
      statement: "The reading is filed and never refused.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep that read no rules files nothing.",
    },
    {
      invariantKind: "departure",
      statement: "No graph cache is read, so the population is the checkout as it now stands.",
    },
  ],
} as const satisfies WorkstationService
