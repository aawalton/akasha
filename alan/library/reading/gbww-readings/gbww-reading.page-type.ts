import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const gbwwReading = {
  id: "01a0659f-93da-7019-b3d4-198e7acfbd4c",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "gbww-reading",
  definition: "one reading on the Great Books of the Western World ten-year plan",
  pluralSlug: "gbww-readings",
  extends: ["page-type/collection"],
  parts: [
    "number-property/gbww-plan-year",
    "number-property/gbww-reading-number",
    "relation-property/gbww-story",
    "select-property/gbww-edition-marker",
    "text-property/gbww-plan-key",
    "text-property/gbww-section",
    "text-property/gbww-work",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/collection-author", required: true, many: false },
    { pageProperty: "text-property/gbww-work", required: true, many: false },
    { pageProperty: "text-property/gbww-section", required: true, many: false },
    { pageProperty: "text-property/gbww-plan-key", required: true, many: false },
    { pageProperty: "number-property/gbww-plan-year", required: true, many: false },
    { pageProperty: "number-property/gbww-reading-number", required: true, many: false },
    { pageProperty: "select-property/gbww-edition-marker", required: true, many: false },
    { pageProperty: "relation-property/gbww-story", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading names the work read and how much of that work is read.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is where the plan puts the reading.",
    },
    {
      invariantKind: "departure",
      statement: "A work read twice on the plan is two readings.",
    },
    {
      invariantKind: "absence",
      statement: "A reading is no record of a day Alan read.",
    },
  ],
  types: "ts",
} as const satisfies PageType
