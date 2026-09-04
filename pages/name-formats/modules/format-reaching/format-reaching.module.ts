import type { Module } from "@akasha/code-system/module"

export const formatReaching = {
  id: "01a04ff9-7758-71a6-bf33-91862c9be16d",
  pageTypeSlug: "module",
  slug: "format-reaching",
  definition: "how a name format is reached by slug and its judgement loaded",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A format's judgement is loaded from the code file beside the format's own page.",
    },
    {
      invariantKind: "departure",
      statement:
        "The code is loaded from wherever on disk its body stands rather than from where a change leaves it.",
    },
    {
      invariantKind: "departure",
      statement: "What is loaded is what the slug's export name answers to.",
    },
    {
      invariantKind: "departure",
      statement: "Each format is loaded once and held.",
    },
  ],
} as const satisfies Module
