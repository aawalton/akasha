import type { Module } from "@akasha/code-system/module"

export const companionsOverviewRapport = {
  id: "01a0611d-84dd-77d5-88e1-b34569c99e53",
  pageTypeSlug: "module",
  slug: "companions-overview-rapport",
  definition: "the numeric rapport label laid over the game's own companion overview",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The game's own rapport bar is left in place and labelled rather than replaced.",
    },
  ],
} as const satisfies Module
