import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuApiEntries = {
  id: "01a06275-c443-709d-8562-0ff2fc429904",
  type: "page-type/module",
  slug: "scrollable-menu-api-entries",
  definition: "the typed global wrappers that add an entry of a fixed entry type",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each wrapper delegates to the single generic entry-adding global.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Optional arguments are folded into the additional-data table before delegating.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every wrapper returns the added index and the created entry table.",
    },
  ],
} as const satisfies Module
