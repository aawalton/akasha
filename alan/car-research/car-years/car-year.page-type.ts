import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const carYear = {
  id: "01a0659d-2432-715e-b4e1-2cfa27018de7",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "car-year",
  definition: "one model year of a nameplate",
  pluralSlug: "car-years",
  extends: ["page-type/car"],
  parts: [
    "number-property/model-year",
    "relation-property/car-model",
    "text-property/refresh-notes",
  ],
  properties: [
    { pageProperty: "number-property/model-year", required: true, many: false },
    { pageProperty: "text-property/refresh-notes", required: true, many: false },
    { pageProperty: "relation-property/car-model", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A year names the model above that year and never the trims below.",
    },
  ],
  types: "ts",
} as const satisfies PageType
