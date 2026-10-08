import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const effectStatus = {
  id: "01a06196-037b-7292-b3da-52c4a6dc68a0",
  type: "page-type/record-property",
  slug: "effect-status",
  propertySlug: "status",
  definition: "the status an effect applies, and how long it holds",
  properties: [
    { pageProperty: "text-property/status-name", required: false, many: false },
    { pageProperty: "number-property/duration", required: false, many: false },
    { pageProperty: "number-property/status-magnitude", required: false, many: false },
    { pageProperty: "number-property/status-distance", required: false, many: false },
  ],
  types: "ts",
  createdAt: "2026-09-02T10:06:56.379Z",
  updatedAt: "2026-09-21T15:26:51.000Z",
} as const satisfies RecordProperty
