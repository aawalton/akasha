import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const traits = {
  id: "01a0616b-2cdf-7004-88a2-5ab03de323e8",
  type: "page-type/page-property-entry",
  slug: "traits",
  propertySlug: "traits",
  definition: "the traits a research line covers, one trait to a line",
  properties: [
    { pageProperty: "number-property/trait-index", required: true, many: false },
    { pageProperty: "text-property/trait-name", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait here is a trait a player researches on the item a line names.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T09:20:08.927Z",
  updatedAt: "2026-09-21T15:27:16.000Z",
} as const satisfies PagePropertyEntry
