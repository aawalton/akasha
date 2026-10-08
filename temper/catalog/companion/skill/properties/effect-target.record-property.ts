import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const effectTarget = {
  id: "01a06196-0378-75a0-80bb-3aec137ffc83",
  type: "page-type/record-property",
  slug: "effect-target",
  propertySlug: "target",
  definition: "who an effect lands on and how far it reaches",
  properties: [
    { pageProperty: "text-property/target-kind", required: false, many: false },
    { pageProperty: "text-property/target-scope", required: false, many: false },
    { pageProperty: "number-property/target-range", required: false, many: false },
    { pageProperty: "number-property/target-radius", required: false, many: false },
    { pageProperty: "number-property/max-targets", required: false, many: false },
  ],
  types: "ts",
  createdAt: "2026-09-02T10:06:56.376Z",
  updatedAt: "2026-09-21T15:26:51.000Z",
} as const satisfies RecordProperty
