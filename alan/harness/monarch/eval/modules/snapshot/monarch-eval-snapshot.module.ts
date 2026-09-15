import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchEvalSnapshot = {
  id: "01a06863-264d-7e8e-895d-7274b1dbf33c",
  type: "page-type/module",
  slug: "monarch-eval-snapshot",
  definition: "the mark every Monarch page family has, so a run can say nothing moved",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A family's mark is its page count and a hash over every page's path and bytes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Pages are hashed in path order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Transactions are marked from their sidecars rather than from the month pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A month with no sidecar is hashed as having no sidecar rather than failing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A move is said family by family as the mark before and the mark after.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A family present on one side and absent on the second is said as absent rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
