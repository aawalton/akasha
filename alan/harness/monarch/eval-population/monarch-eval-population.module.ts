import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchEvalPopulation = {
  id: "01a06867-e5ed-70fd-8fee-bffe0cd3c068",
  pageTypeSlug: "module",
  slug: "monarch-eval-population",
  definition: "which transactions an agent can be scored on, and the sample drawn from them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A row a standing rule already settles is not this project's subject and is not scored.",
    },
    {
      invariantKind: "departure",
      statement: "A row nobody has answered has no answer to score against and is not scored.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every scorable category belongs to a declared stratum, and one belonging to none is refused rather than defaulted, because a default would report it as something nobody decided.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which pool a row falls in is decided by a hash of its own id, so the split is the same every run and does not move as rows arrive.",
    },
    {
      invariantKind: "departure",
      statement:
        "The draw within a stratum is ordered by a salted hash rather than by chance, so a run can be repeated.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stratum with fewer rows than were asked for gives what it has rather than drawing from another.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a model.",
    },
  ],
} as const satisfies Module
