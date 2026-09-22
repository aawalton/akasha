import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const mechanicReadings = {
  id: "01a063ce-6216-7002-a04b-18f373a5a1d3",
  type: "page-type/page-property-entry",
  slug: "mechanic-readings",
  propertySlug: "mechanic-readings",
  definition: "how each name a world's text uses is taken as a mechanic, one name to a line",
  properties: [
    { pageProperty: "text-property/reading-slug", required: true, many: false },
    { pageProperty: "text-property/reading-name", required: true, many: false },
    { pageProperty: "select-property/reading-kind", required: true, many: false },
    { pageProperty: "text-property/mechanic-slug", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading names its mechanic unless the reading's kind is `none` or `unsure`.",
    },
  ],
  types: "ts",
} as const satisfies PagePropertyEntry
