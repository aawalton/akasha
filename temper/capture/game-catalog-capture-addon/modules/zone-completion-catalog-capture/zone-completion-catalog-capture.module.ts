import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneCompletionCatalogCapture = {
  id: "01a060e2-3186-7265-a0dc-af76d21939e4",
  type: "page-type/module",
  slug: "zone-completion-catalog-capture",
  definition:
    "the zone completion activities of every zone, read into the add-on's saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone is asked about fourteen completion types.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A completion type with no named activity is left out.",
    },
  ],
} as const satisfies Module
