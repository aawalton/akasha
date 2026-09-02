import type { Module } from "@akasha/code-system/module"

export const housingSlash = {
  id: "01a06128-d5d3-74a2-81ea-747b3975df38",
  pageTypeSlug: "module",
  slug: "housing-slash",
  definition: "what each word after the housing slash command does",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slash command naming no word opens the window.",
    },
  ],
} as const satisfies Module
