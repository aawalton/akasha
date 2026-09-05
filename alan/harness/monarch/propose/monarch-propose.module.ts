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
      statement: "Nothing is written, so a rule can be weighed before that rule stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command-line rule is weighed alongside the standing rules rather than in place of those rules.",
    },
    {
      invariantKind: "departure",
      statement:
        "A named rule that does not stand is refused, and the rules that do stand are named in the refusal.",
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
