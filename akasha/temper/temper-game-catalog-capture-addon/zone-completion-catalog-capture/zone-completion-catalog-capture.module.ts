import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const zoneCompletionCatalogCapture = {
  id: "01a060e2-3186-7265-a0dc-af76d21939e4",
  pageTypeSlug: "module",
  slug: "zone-completion-catalog-capture",
  definition:
    "the zone completion activities of every zone, read into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "A zone is asked about fourteen completion types.",
    },
    {
      invariantKind: "departure",
      statement: "A completion type holding no named activity is left out.",
    },
  ],
} as const satisfies Module
