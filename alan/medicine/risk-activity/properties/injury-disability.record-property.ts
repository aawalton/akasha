import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const injuryDisability = {
  id: "01a183c0-83c9-78ce-9237-6df47e398578",
  type: "page-type/record-property",
  slug: "injury-disability",
  propertySlug: "injury-disability",
  definition: "the injuries a risk activity causes with the disability from each injury",
  properties: [
    { pageProperty: "text-property/injury-name", required: true, many: false },
    { pageProperty: "number-property/injuries-per-million-units", required: true, many: false },
    { pageProperty: "number-property/disability-weight", required: true, many: false },
    { pageProperty: "number-property/disability-years", required: true, many: false },
    {
      pageProperty: "number-property/injuries-per-million-units-low",
      required: false,
      many: false,
    },
    {
      pageProperty: "number-property/injuries-per-million-units-high",
      required: false,
      many: false,
    },
    { pageProperty: "number-property/disability-weight-low", required: false, many: false },
    { pageProperty: "number-property/disability-weight-high", required: false, many: false },
  ],
  types: "ts",
  createdAt: "2026-10-28T18:23:14.375Z",
  updatedAt: "2026-10-30T16:06:57.142Z",
} as const satisfies RecordProperty
