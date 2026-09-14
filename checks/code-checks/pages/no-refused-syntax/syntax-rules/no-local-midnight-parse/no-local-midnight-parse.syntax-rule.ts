import type { SyntaxRule } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.types.ts"

export const noLocalMidnightParse = {
  id: "01a0502e-ff9d-7175-a105-c6d1db716e4b",
  type: "syntax-rule",
  slug: "no-local-midnight-parse",
  definition: "the rule refusing a date turned into an instant by pinning a midnight onto it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A midnight written into a template is read as a midnight written with `+`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The midnight is looked for at the head of the piece following the date.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A midnight further in is text about a time rather than a time being built.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Seconds and a fraction after the midnight are read as the midnight itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One instant is named at more length.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every piece of a joined chain is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only `Date` built with `new` is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An hour that is not midnight is left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The fault is the pretence that a date names an instant rather than the joining itself.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A midnight held in a variable and joined on in a later statement is not seen.",
    },
  ],
} as const satisfies SyntaxRule
