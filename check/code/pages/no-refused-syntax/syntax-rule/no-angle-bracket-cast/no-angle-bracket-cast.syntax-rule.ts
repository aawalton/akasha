import type { SyntaxRule } from "akasha/check/code/pages/no-refused-syntax/syntax-rule/syntax-rule.page-type.types.ts"

export const noAngleBracketCast = {
  id: "01a05964-deb4-78ba-943a-0870780ca4d5",
  type: "syntax-rule",
  slug: "no-angle-bracket-cast",
  definition: "the rule refusing an assertion written as `<Type>value`",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The form is found in the parse and never in the text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`as` is the spelling an assertion is written in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The same characters in a `.tsx` file are read as a tag rather than as an assertion.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "How the assertion is written is judged here rather than the type that assertion asserts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One assertion wrapping another assertion is refused once for each assertion.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type argument written on a call has the same brackets and is untouched.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The same assertion written with `as` is left.",
    },
  ],
} as const satisfies SyntaxRule
