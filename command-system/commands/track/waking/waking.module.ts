import type { Module } from "@akasha/code-system/module"

export const waking = {
  id: "01a06c4c-15f1-7000-9fb5-6a33127258e9",
  pageTypeSlug: "module",
  slug: "waking",
  definition: "which day a sleep woke into, and which day comes before another",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The day a sleep woke into is the ESO day the sleep ended inside.",
    },
    {
      invariantKind: "departure",
      statement: "An ESO day opens at six in the morning in New York.",
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
