import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogCommand = {
  id: "01a063ba-94e5-701e-9834-3d28bebc065c",
  type: "module",
  slug: "catalog-command",
  definition: "what the player's slash command clears and what it prints about each catalog",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Clearing a catalog marks the whole set incomplete so the next login refills the set.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A domain name the add-on does not carry clears nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A clear naming no target lists the domains the last run skipped.",
    },
  ],
} as const satisfies Module
