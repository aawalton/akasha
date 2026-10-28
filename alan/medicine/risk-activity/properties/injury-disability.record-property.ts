import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const injuryDisability = {
  id: "01a183c0-83c9-78ce-9237-6df47e398578",
  type: "page-type/record-property",
  slug: "injury-disability",
  propertySlug: "injury-disability",
  definition:
    "the injuries an activity causes and the disability each leaves, one injury at a time",
  properties: [
    { pageProperty: "text-property/injury-name", required: true, many: false },
    { pageProperty: "number-property/injuries-per-million-units", required: true, many: false },
    { pageProperty: "number-property/disability-weight", required: true, many: false },
    { pageProperty: "number-property/disability-years", required: true, many: false },
  ],
  types: "ts",
  createdAt: "2026-10-28T18:23:14.375Z",
  updatedAt: "2026-10-28T18:23:14.375Z",
} as const satisfies RecordProperty
