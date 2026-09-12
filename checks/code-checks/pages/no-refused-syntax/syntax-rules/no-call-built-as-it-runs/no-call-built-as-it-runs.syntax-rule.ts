import type { SyntaxRule } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.types.ts"

export const noCallBuiltAsItRuns = {
  id: "01a0950e-c46b-7000-8560-8256b53bda3e",
  type: "syntax-rule",
  slug: "no-call-built-as-it-runs",
  definition:
    "the rule refusing a call built as the code runs where that call spelled out is refused",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A template is judged by the call that template builds rather than by its pieces.",
    },
    {
      invariantKind: "departure",
      statement: "What the rules judging a call spelled out refuse, this rule refuses built.",
    },
    {
      invariantKind: "departure",
      statement: "A constant this file declares is put where that constant's name is written.",
    },
    {
      invariantKind: "departure",
      statement: "A piece the code works out is judged as one word naming nothing in particular.",
    },
    {
      invariantKind: "departure",
      statement: "That word names a level only where the slug before that word names one.",
    },
    {
      invariantKind: "departure",
      statement: "The line refused is the template's own rather than a line in what it builds.",
    },
    {
      invariantKind: "departure",
      statement: "Which files are judged is left to the rules this rule judges by.",
    },
    {
      invariantKind: "departure",
      statement:
        "A directive's words are left alone, as the rule judging a spelled call leaves them.",
    },
    {
      invariantKind: "absence",
      statement: "A constant another file declares is not followed.",
    },
    {
      invariantKind: "absence",
      statement: "A value arriving as an argument is not followed.",
    },
    {
      invariantKind: "absence",
      statement: "A call whose every level the code works out is not judged.",
    },
    {
      invariantKind: "absence",
      statement: "A name built as the code runs that names no call is not judged.",
    },
  ],
} as const satisfies SyntaxRule
