import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchPropose = {
  id: "01a06867-fdff-7c1a-91f8-4e475fdf3880",
  pageTypeSlug: "module",
  slug: "monarch-propose",
  definition: "the rules run over the whole history and reported on, writing nothing",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing is written, so a rule can be weighed before it stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule stated on the command line is weighed alongside the standing ones rather than instead of being checked.",
    },
    {
      invariantKind: "departure",
      statement:
        "A named rule that does not stand is refused, and what does stand is named in the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A run with no rule at all is refused, and where the rules stand is said.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every rule is weighed against every transaction, so shadowing between rules is visible.",
    },
  ],
} as const satisfies Module
