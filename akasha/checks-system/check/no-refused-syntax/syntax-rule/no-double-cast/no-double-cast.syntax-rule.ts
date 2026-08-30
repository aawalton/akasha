import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noDoubleCast = {
  id: "01a05014-65e2-7fd3-9e14-ba32ad61ae6b",
  pageTypeSlug: "syntax-rule",
  slug: "no-double-cast",
  definition: "the rule refusing an assertion that reaches its target through `unknown` or `any`",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An assertion standing on a widening is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One assertion on its own stands.",
    },
    {
      invariantKind: "departure",
      statement: "`any` widens as `unknown` does.",
    },
    {
      invariantKind: "departure",
      statement: "A widening standing alone is left.",
    },
    {
      invariantKind: "departure",
      statement: "A parenthesis between the two changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The pair is one assertion on another however it is written.",
    },
    {
      invariantKind: "departure",
      statement: "The angle-bracket spelling is read as `as` is.",
    },
    {
      invariantKind: "departure",
      statement: "A test file is judged as any other.",
    },
    {
      invariantKind: "gap",
      statement: "A widening held in a variable and asserted in a later statement is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "The two stand apart.",
    },
  ],
} as const satisfies SyntaxRule
