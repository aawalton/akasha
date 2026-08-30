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
      statement:
        "A date joined to a midnight and handed to `Date` is refused, because what comes back is midnight where the machine stands rather than midnight where the day is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A midnight written into a template is read as one written with `+`, so neither spelling is the quiet way round.",
    },
    {
      invariantKind: "departure",
      statement:
        "The midnight is looked for at the head of the piece following the date, a midnight further in being text about a time rather than a time being built.",
    },
    {
      invariantKind: "departure",
      statement:
        "Seconds and a fraction after the midnight are read as the midnight itself, one instant being named at more length.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every piece of a joined chain is read, so a midnight pinned on at the end of a longer sum is refused as one pinned on directly.",
    },
    {
      invariantKind: "departure",
      statement:
        "Only `Date` built with `new` is judged, because it is the reading of the string that goes wrong and nothing else here reads one.",
    },
    {
      invariantKind: "departure",
      statement:
        "An hour that is not midnight stands, the fault being the pretence that a date names an instant rather than the joining itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test file is judged as any other, because a date read in the machine's zone passes wherever the machine is set and fails elsewhere.",
    },
    {
      invariantKind: "gap",
      statement:
        "A midnight held in a variable and joined on in a later statement is not seen, the two standing apart.",
    },
  ],
} as const satisfies SyntaxRule
