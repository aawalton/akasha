import type { Module } from "@akasha/code/module"

export const waking = {
  id: "01a06c4c-15f1-7000-9fb5-6a33127258e9",
  pageTypeSlug: "module",
  type: "module",
  slug: "waking",
  definition: "which day a sleep opens, and which day comes before another",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The day a sleep opens is read from when that sleep began.",
    },
    {
      invariantKind: "departure",
      statement: "A sleep beginning at or after six the evening in New York opens the day after.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch is a sleep where the title of the stretch reads sleep alone.",
    },
    {
      invariantKind: "departure",
      statement: "A title is read for that word with its case and its spacing set aside.",
    },
    {
      invariantKind: "departure",
      statement: "A day that will not parse answers itself.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a checkout.",
    },
  ],
} as const satisfies Module
