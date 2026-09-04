import type { Domain } from "../../../domains/domains/domain.page-type.ts"

export const activity = {
  id: "01a06222-9828-776f-bc9a-0f3774308c14",
  pageTypeSlug: "domain",
  slug: "activity",
  definition: "how much Alan moved on a day",
  partSlugs: [
    "module/activity-reading",
    "readout/upkeep-activity",
    "workstation-service/activity-reading-service",
    "workstation-service/activity-relay-service",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The activity is read from the tracking the workstation's checkout carries.",
    },
    {
      invariantKind: "departure",
      statement: "The calories a day's health readings came to are rolled onto that day first.",
    },
    {
      invariantKind: "departure",
      statement:
        "The reading is taken by a workstation timer rather than by a pod serving a route.",
    },
    {
      invariantKind: "departure",
      statement: "Every site showing the activity is carried the activity rather than taking one.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that fails to one site does not stop the carry to another site.",
    },
    {
      invariantKind: "departure",
      statement: "The tile shows the activity Alan's workstation last took.",
    },
    {
      invariantKind: "constraint",
      statement: "An activity nothing can be read for is shown as no signal rather than as a zero.",
    },
  ],
} as const satisfies Domain
