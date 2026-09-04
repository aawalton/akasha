import type { Domain } from "../../../domain-system/domains/domain.page-type.ts"

export const capacity = {
  id: "01a06230-614e-7825-b4af-dd84fd42f0ce",
  pageTypeSlug: "domain",
  slug: "capacity",
  definition: "how much stress capacity Alan's day has left him in hand",
  partSlugs: [
    "module/capacity-reading",
    "readout/upkeep-capacity",
    "workstation-service/capacity-reading-service",
    "workstation-service/capacity-relay-service",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The capacity is read from the tracking the workstation's checkout carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "The capacity is summed over the stretches of the day rather than read off the day.",
    },
    {
      invariantKind: "departure",
      statement:
        "The reading is taken by a workstation timer rather than by a pod serving a route.",
    },
    {
      invariantKind: "departure",
      statement: "Every site showing the capacity is carried the capacity rather than taking one.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that fails to one site does not stop the carry to another site.",
    },
    {
      invariantKind: "departure",
      statement: "The tile shows the capacity Alan's workstation last took.",
    },
    {
      invariantKind: "constraint",
      statement: "A capacity nothing can be read for is shown as no signal rather than as a zero.",
    },
  ],
} as const satisfies Domain
