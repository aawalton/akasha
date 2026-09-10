import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type MechanicReadings = "jsonl"

export const mechanicReadings = {
  id: "01a063ce-6216-7002-a04b-18f373a5a1d3",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "mechanic-readings",
  propertySlug: "mechanic-readings",
  definition: "how each name a world's text uses is read as a mechanic, one name to a line",
  properties: [
    { pageProperty: "text-property/reading-slug", required: true, many: false },
    { pageProperty: "text-property/reading-name", required: true, many: false },
    { pageProperty: "text-property/reading-kind", required: true, many: false },
    { pageProperty: "text-property/mechanic-slug", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading names its mechanic unless the reading's kind is `none` or `unsure`.",
    },
  ],
} as const satisfies PagePropertyEntry
