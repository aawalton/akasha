import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noLocalMidnightParse = {
  id: "01a0502e-ff9d-7175-a105-c6d1db716e4b",
  pageTypeSlug: "syntax-rule",
  slug: "no-local-midnight-parse",
  definition: "the rule refusing a date turned into an instant by pinning a midnight onto it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A date joined to a midnight and handed to `Date` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A midnight written into a template is read as one written with `+`.",
    },
    {
      invariantKind: "departure",
      statement: "The midnight is looked for at the head of the piece following the date.",
    },
    {
      invariantKind: "departure",
      statement: "A midnight further in is text about a time rather than a time being built.",
    },
    {
      invariantKind: "departure",
      statement: "Seconds and a fraction after the midnight are read as the midnight itself.",
    },
    {
      invariantKind: "departure",
      statement: "One instant is named at more length.",
    },
    {
      invariantKind: "departure",
      statement: "Every piece of a joined chain is read.",
    },
    {
      invariantKind: "departure",
      statement: "Only `Date` built with `new` is judged.",
    },
    {
      invariantKind: "departure",
      statement: "An hour that is not midnight stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "The fault is the pretence that a date names an instant rather than the joining itself.",
    },
    {
      invariantKind: "departure",
      statement: "A test file is judged as any other.",
    },
    {
      invariantKind: "gap",
      statement: "A midnight held in a variable and joined on in a later statement is not seen.",
    },
    {
      invariantKind: "gap",
      statement: "The two stand apart.",
    },
  ],
} as const satisfies SyntaxRule
