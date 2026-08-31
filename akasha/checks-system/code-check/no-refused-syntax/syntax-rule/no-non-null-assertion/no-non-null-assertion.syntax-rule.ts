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
      statement: "It is refused wherever an expression may stand.",
    },
    {
      invariantKind: "departure",
      statement: "One reached through an optional chain is refused as a bare one is.",
    },
    {
      invariantKind: "departure",
      statement: "One standing on another is refused once for each.",
    },
    {
      invariantKind: "departure",
      statement:
        "A definite assignment written on a declaration is another spelling and is not this.",
    },
    {
      invariantKind: "departure",
      statement: "Logical negation shares the character and is untouched.",
    },
    {
      invariantKind: "departure",
      statement: "A test file is judged as any other.",
    },
    {
      invariantKind: "gap",
      statement: "A cast asserting the same absence away some other way stands.",
    },
  ],
} as const satisfies SyntaxRule
