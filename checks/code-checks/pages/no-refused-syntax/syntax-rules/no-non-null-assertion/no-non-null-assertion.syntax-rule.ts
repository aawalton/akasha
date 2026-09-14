import type { SyntaxRule } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.types.ts"

export const noNonNullAssertion = {
  id: "01a05964-deb4-7557-82b0-293c12e0bf59",
  type: "syntax-rule",
  slug: "no-non-null-assertion",
  definition:
    "the rule refusing a value called present with `!` where the types say it may be absent",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The operator is found in the parse and never in the text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The operator is refused wherever an expression may sit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An operator reached through an optional chain is refused as a bare operator is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An operator sitting on another operator is refused once for each operator.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A definite assignment written on a declaration is another spelling and is not this operator.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Logical negation shares the character and is untouched.",
    },
  ],
} as const satisfies SyntaxRule
