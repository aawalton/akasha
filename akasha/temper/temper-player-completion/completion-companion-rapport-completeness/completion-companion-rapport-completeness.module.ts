import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCompanionRapportCompleteness = {
  id: "01a06121-f0d2-72a1-a388-f307955fb724",
  pageTypeSlug: "module",
  slug: "completion-companion-rapport-completeness",
  definition: "whether a character has every companion at full rapport",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "A companion the game gives no identifier is left out.",
    },
  ],
} as const satisfies Module
