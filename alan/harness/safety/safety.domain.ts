import type { Domain } from "../../../domains/domain.page-type.ts"

export const safety = {
  id: "01a05f42-92f5-7005-9a61-d2ed59cb2fac",
  pageTypeSlug: "domain",
  slug: "safety",
  definition: "the safety level Alan logs against the block Alan is in",
  partSlugs: [
    "module/safety-reading",
    "readout/upkeep-safety",
    "workstation-service/safety-reading-service",
    "workstation-service/safety-relay-service",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The level is read from the tracking the workstation's checkout carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "The reading is taken by a workstation timer rather than by a pod serving a route.",
    },
    {
      invariantKind: "departure",
      statement: "Every site showing the level is carried the level rather than taking one.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that fails to one site does not stop the carry to another site.",
    },
    {
      invariantKind: "departure",
      statement: "The tile shows the level Alan's workstation last took.",
    },
    {
      invariantKind: "constraint",
      statement: "A level nothing can be read for is shown as no signal rather than as a zero.",
    },
  ],
} as const satisfies Domain
