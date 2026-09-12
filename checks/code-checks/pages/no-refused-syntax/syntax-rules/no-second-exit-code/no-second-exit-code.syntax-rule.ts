import type { SyntaxRule } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.types.ts"

export const noSecondExitCode = {
  id: "01a09404-576c-788f-b915-f4998c66542e",
  type: "syntax-rule",
  slug: "no-second-exit-code",
  definition: "the rule refusing an exit code declared again away from the page declaring the five",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One page declares what each exit code is, and every other file imports it.",
    },
    {
      invariantKind: "departure",
      statement: "A name is refused only where the number beside it is the one that name means.",
    },
    {
      invariantKind: "departure",
      statement: "One of those names holding another number is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration inside a function is refused as one at the top of a file is.",
    },
    {
      invariantKind: "departure",
      statement: "An exported declaration is refused as a private one is.",
    },
    {
      invariantKind: "absence",
      statement: "A name read from another page rather than from a number is not seen.",
    },
  ],
} as const satisfies SyntaxRule
