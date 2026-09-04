import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noNonNullAssertion = {
  id: "01a05964-deb4-7557-82b0-293c12e0bf59",
  pageTypeSlug: "syntax-rule",
  slug: "no-non-null-assertion",
  definition:
    "the rule refusing a value called present with `!` where the types say it may be absent",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The operator is found in the parse and never in the text.",
    },
    {
      invariantKind: "departure",
      statement: "The operator is refused wherever an expression may stand.",
    },
    {
      invariantKind: "departure",
      statement: "One reached through an optional chain is refused as a bare one is.",
    },
    {
      invariantKind: "departure",
      statement: "An operator standing on another operator is refused once for each operator.",
    },
    {
      invariantKind: "departure",
      statement:
        "A definite assignment written on a declaration is another spelling and is not this operator.",
    },
    {
      invariantKind: "departure",
      statement: "Logical negation shares the character and is untouched.",
    },
    {
      invariantKind: "gap",
      statement: "A cast asserting the same absence away some other way stands.",
    },
  ],
} as const satisfies SyntaxRule
