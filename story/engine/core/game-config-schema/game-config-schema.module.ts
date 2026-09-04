import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const gameConfigSchema = {
  id: "01a05b71-e543-7e5f-b316-0eae8b14a849",
  pageTypeSlug: "module",
  slug: "game-config-schema",
  definition:
    "everything a game declares about itself, weighed together before it is allowed to run",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A game that rolls declares how the game resolves.",
    },
    {
      invariantKind: "departure",
      statement: "A game that never rolls declares no resolution mechanism.",
    },
    {
      invariantKind: "departure",
      statement: "Every fault found is reported at once rather than the first alone.",
    },
  ],
} as const satisfies Module
