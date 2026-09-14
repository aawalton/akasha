import type { SyntaxRule } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.types.ts"

export const noHyphenatedCall = {
  id: "01a0945c-0c1b-71fb-8a5c-8c0d26e8acfb",
  type: "syntax-rule",
  slug: "no-hyphenated-call",
  definition: "the rule refusing a call spelled in one word where its levels want spaces",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call is spelled with a space between each level of the command tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What each level names itself says where one level ends and the next begins.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A level whose own name carries a hyphen keeps that hyphen.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug naming no level of the command tree is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug with no `akasha` before it names a page rather than a call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A piece of a template literal is judged as a whole string literal is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the file holding a page's code is judged.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A name built as the code runs is not seen.",
    },
  ],
} as const satisfies SyntaxRule
