import type { Module } from "@akasha/code-system/module"

export const housingSearch = {
  id: "01a06128-d5d1-76dc-adcd-583afb6e89d6",
  pageTypeSlug: "module",
  slug: "housing-search",
  definition: "matching what a player types against the names the add-on has seen",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Matching begins once the typed text is long enough.",
    },
    {
      invariantKind: "departure",
      statement: "The number of results shown at once is capped.",
    },
  ],
} as const satisfies Module
