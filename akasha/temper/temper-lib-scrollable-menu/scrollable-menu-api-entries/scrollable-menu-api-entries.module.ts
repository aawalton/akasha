import type { Module } from "@akasha/code-system/module"

export const scrollableMenuApiEntries = {
  id: "01a06275-c443-709d-8562-0ff2fc429904",
  pageTypeSlug: "module",
  slug: "scrollable-menu-api-entries",
  definition: "the typed global wrappers that add one entry of a fixed entry type",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each wrapper delegates to the single generic entry-adding global.",
    },
    {
      invariantKind: "departure",
      statement: "Optional arguments are folded into the additional-data table before delegating.",
    },
    {
      invariantKind: "constraint",
      statement: "Every wrapper returns the added index and the created entry table.",
    },
  ],
} as const satisfies Module
