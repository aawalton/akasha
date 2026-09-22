import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsFishingBugFix = {
  id: "01a06269-2aac-7a19-8225-464a414a73a0",
  type: "page-type/module",
  slug: "map-pins-fishing-bug-fix",
  definition: "the fishing holes the game misplaces, corrected",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
