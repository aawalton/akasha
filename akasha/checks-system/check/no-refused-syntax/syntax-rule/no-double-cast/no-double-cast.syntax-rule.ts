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
      statement:
        "An assertion standing on a widening is refused, because widening first is what lets the assertion after it name any type at all.",
    },
    {
      invariantKind: "departure",
      statement:
        "One assertion on its own stands, since claiming a shape where the checker cannot see is not the same as telling it to stop looking.",
    },
    {
      invariantKind: "departure",
      statement:
        "`any` widens as `unknown` does, so an assertion reaching through either is refused and neither is the quiet way round.",
    },
    {
      invariantKind: "departure",
      statement:
        "A widening standing alone is left, because `x as unknown` claims nothing and only what follows it could.",
    },
    {
      invariantKind: "departure",
      statement:
        "A parenthesis between the two changes nothing, the pair being one assertion on another however it is written.",
    },
    {
      invariantKind: "departure",
      statement:
        "The angle-bracket spelling is read as `as` is, so neither form escapes by being the rarer one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test file is judged as any other, because a checker told to stop looking in a test proves whatever it was aimed at.",
    },
    {
      invariantKind: "gap",
      statement:
        "A widening held in a variable and asserted in a later statement is not seen, the two standing apart.",
    },
  ],
} as const satisfies SyntaxRule
