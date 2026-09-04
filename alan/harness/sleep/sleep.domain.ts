import type { Domain } from "../../../domains/domains/domain.page-type.ts"

export const sleep = {
  id: "01a06220-ef8c-735b-b8a1-1cb4507d71b0",
  pageTypeSlug: "domain",
  slug: "sleep",
  definition: "the hours Alan logs sleeping across a day's stretches",
  partSlugs: [
    "module/sleep-reading",
    "readout/upkeep-sleep",
    "workstation-service/sleep-reading-service",
    "workstation-service/sleep-relay-service",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The sleep is read from the tracking the workstation's checkout carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "The reading is taken by a workstation timer rather than by a pod serving a route.",
    },
    {
      invariantKind: "departure",
      statement: "Every site showing the sleep is carried the sleep rather than taking one.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that fails to one site does not stop the carry to another site.",
    },
    {
      invariantKind: "departure",
      statement: "The tile shows the sleep Alan's workstation last took.",
    },
    {
      invariantKind: "constraint",
      statement: "A sleep nothing can be read for is shown as no signal rather than as a zero.",
    },
  ],
} as const satisfies Domain
