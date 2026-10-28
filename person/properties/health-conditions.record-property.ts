import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const healthConditions = {
  id: "01a183b0-fc74-72bd-9b11-93d07b6d0e8c",
  type: "page-type/record-property",
  slug: "health-conditions",
  propertySlug: "health-conditions",
  definition: "the health conditions a person has, one condition at a time",
  properties: [
    { pageProperty: "text-property/health-condition-name", required: true, many: false },
    { pageProperty: "select-property/diagnosed-by", required: false, many: false },
  ],
  types: "ts",
  createdAt: "2026-10-28T18:06:16.691Z",
  updatedAt: "2026-10-28T18:06:16.691Z",
} as const satisfies RecordProperty
