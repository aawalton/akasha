import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchEvalSnapshot = {
  id: "01a06863-264d-7e8e-895d-7274b1dbf33c",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-eval-snapshot",
  definition: "the mark every Monarch page family has, so a run can say nothing moved",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A family's mark is its page count and a hash over every page's path and bytes.",
    },
    {
      invariantKind: "departure",
      statement: "Pages are hashed in path order.",
    },
    {
      invariantKind: "departure",
      statement: "Transactions are marked from their sidecars rather than from the month pages.",
    },
    {
      invariantKind: "departure",
      statement: "A month with no sidecar is hashed as having no sidecar rather than failing.",
    },
    {
      invariantKind: "departure",
      statement: "A move is said family by family as the mark before and the mark after.",
    },
    {
      invariantKind: "departure",
      statement:
        "A family present on one side and absent on the second is said as absent rather than passed over.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
