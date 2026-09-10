import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const car = {
  id: "01a065a0-0000-7000-8000-000000000401",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "car",
  definition: "one level of a maker's catalogue, as Alan weighed buying from it",
  pluralSlug: "cars",
  extends: ["page-type/page"],
  parts: ["boolean-property/short-list", "text-property/exclusion-reason", "text-property/sources"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "boolean-property/short-list", required: false, many: false },
    { pageProperty: "text-property/sources", required: false, many: false },
    { pageProperty: "text-property/exclusion-reason", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every page type naming a level of a maker's catalogue builds on this page type.",
    },
    {
      invariantKind: "departure",
      statement: "A level names the level above that level and never the levels below.",
    },
    {
      invariantKind: "absence",
      statement: "No page is a car itself.",
    },
  ],
  types: "ts",
} as const satisfies PageType
