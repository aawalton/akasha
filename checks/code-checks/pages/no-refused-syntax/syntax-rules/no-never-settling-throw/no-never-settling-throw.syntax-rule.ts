import type { SyntaxRule } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.types.ts"

export const noNeverSettlingThrow = {
  id: "01a082d0-eb31-7c7b-922a-bfc7e90577a2",
  pageTypeSlug: "syntax-rule",
  type: "syntax-rule",
  slug: "no-never-settling-throw",
  definition: "the rule refusing a thrown promise whose executor can never reach resolve or reject",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a promise built where that promise is thrown is judged.",
    },
    {
      invariantKind: "departure",
      statement: "An executor taking no parameter can never settle.",
    },
    {
      invariantKind: "departure",
      statement: "An executor naming a parameter that executor never reads can never settle.",
    },
    {
      invariantKind: "departure",
      statement: "An executor whose parameters are not all plain names is left.",
    },
    {
      invariantKind: "departure",
      statement: "A Promise reached through any object is read as a promise.",
    },
  ],
} as const satisfies SyntaxRule
