import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const medications = {
  id: "01a183b2-27fb-7fd1-abb3-d777318f82dd",
  type: "page-type/record-property",
  slug: "medications",
  propertySlug: "medications",
  definition: "the medications and supplements a person takes, one at a time",
  properties: [
    { pageProperty: "text-property/medication-name", required: true, many: false },
    { pageProperty: "number-property/medication-dose-mg", required: true, many: false },
    { pageProperty: "number-property/medication-doses-per-week", required: true, many: false },
    { pageProperty: "text-property/medication-note", required: false, many: false },
  ],
  types: "ts",
  createdAt: "2026-10-28T18:07:33.369Z",
  updatedAt: "2026-10-28T18:07:33.369Z",
} as const satisfies RecordProperty
