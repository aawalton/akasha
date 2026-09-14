import type { SyntaxRule } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.types.ts"

export const noDoubleCast = {
  id: "01a05014-65e2-7fd3-9e14-ba32ad61ae6b",
  type: "syntax-rule",
  slug: "no-double-cast",
  definition: "the rule refusing an assertion that reaches its target through `unknown` or `any`",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An assertion sitting on a widening is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One assertion on its own is left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`any` widens as `unknown` does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A widening on its own is left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A parenthesis between the two changes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pair is one assertion on another however that pair is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The angle-bracket spelling is read as `as` is.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A widening held in a variable and asserted in a later statement is not seen.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A helper taking `unknown` and asserting a type is a double cast this rule leaves.",
    },
  ],
} as const satisfies SyntaxRule
