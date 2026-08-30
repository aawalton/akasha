import type { Module } from "../../../code-system/module/module.page-type.ts"

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
      statement:
        "A format is reached by the slug it carries, and a name given by id reaches nothing here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A format's judgement is loaded from the code file standing beside the format's own page, never from a shape written here.",
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
