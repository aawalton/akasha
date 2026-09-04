import type { Domain } from "../../../domains/domains/domain.page-type.ts"

export const surplus = {
  id: "01a05fc3-145a-7fb1-9715-e7a44e378f74",
  pageTypeSlug: "domain",
  slug: "surplus",
  definition: "how much of Alan's night the day has left him",
  partSlugs: [
    "module/surplus-fall-notifying",
    "module/surplus-fall-readout",
    "module/surplus-fall-ticking",
    "module/surplus-fall-tier",
    "module/surplus-reading",
    "readout/upkeep-surplus",
    "workstation-service/surplus-reading-service",
    "workstation-service/surplus-relay-service",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The surplus is read from the tracking the workstation's checkout carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "The reading is taken by a workstation timer rather than by a pod serving a route.",
    },
    {
      invariantKind: "departure",
      statement: "Every site showing the surplus is carried the surplus rather than taking one.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that fails to one site does not stop the carry to another site.",
    },
    {
      invariantKind: "departure",
      statement: "The tile shows the surplus Alan's workstation last took.",
    },
    {
      invariantKind: "constraint",
      statement: "A surplus nothing can be read for is shown as no signal rather than as a zero.",
    },
  ],
} as const satisfies Domain
