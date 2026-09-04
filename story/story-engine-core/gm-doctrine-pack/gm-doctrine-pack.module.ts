import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const gmDoctrinePack = {
  id: "01a05b71-e543-7081-b1c4-64539524e7f9",
  pageTypeSlug: "module",
  slug: "gm-doctrine-pack",
  definition:
    "the game master doctrine every game shares, and how it merges into one game's context",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A policy the pack owns is known by an id opening with doctrine.",
    },
    {
      invariantKind: "departure",
      statement: "Changing the pack's content without raising its version is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Replacing a game's context leaves the doctrine the pack owns standing.",
    },
  ],
} as const satisfies Module
