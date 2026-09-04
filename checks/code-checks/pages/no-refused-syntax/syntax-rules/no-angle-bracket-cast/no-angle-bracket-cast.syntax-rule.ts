import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noAngleBracketCast = {
  id: "01a05964-deb4-78ba-943a-0870780ca4d5",
  pageTypeSlug: "syntax-rule",
  slug: "no-angle-bracket-cast",
  definition: "the rule refusing an assertion written as `<Type>value`",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The form is found in the parse and never in the text.",
    },
    {
      invariantKind: "departure",
      statement: "`as` is the one spelling an assertion is written in.",
    },
    {
      invariantKind: "departure",
      statement:
        "The same characters in a `.tsx` file are read as a tag rather than as an assertion.",
    },
    {
      invariantKind: "departure",
      statement: "How the assertion is written is judged here rather than what it asserts.",
    },
    {
      invariantKind: "departure",
      statement: "One assertion wrapping another is refused once for each assertion.",
    },
    {
      invariantKind: "departure",
      statement: "A type argument written on a call carries the same brackets and is untouched.",
    },
    {
      invariantKind: "gap",
      statement: "The same assertion written with `as` stands.",
    },
  ],
} as const satisfies SyntaxRule
