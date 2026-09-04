import type { Domain } from "../../../domains/domains/domain.page-type.ts"

export const plants = {
  id: "01a06221-d65f-739e-9acb-74d67bbe92da",
  pageTypeSlug: "domain",
  slug: "plants",
  definition: "the whole plants Alan has eaten since he rose",
  partSlugs: [
    "module/plants-reading",
    "readout/upkeep-plants",
    "workstation-service/plants-reading-service",
    "workstation-service/plants-relay-service",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The grams are read from the food entries the workstation's checkout carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "The reading is taken by a workstation timer rather than by a pod serving a route.",
    },
    {
      invariantKind: "departure",
      statement:
        "The window counted over runs from the hour Alan rose to the hour Alan rises next.",
    },
    {
      invariantKind: "departure",
      statement: "Every site showing the grams is carried the grams rather than taking one.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that fails to one site does not stop the carry to another site.",
    },
    {
      invariantKind: "departure",
      statement: "The tile shows the grams Alan's workstation last took.",
    },
    {
      invariantKind: "constraint",
      statement: "A day begun with nothing eaten is a reading of zero rather than no signal.",
    },
  ],
} as const satisfies Domain
