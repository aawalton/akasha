import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const proxy = {
  id: "01a0540c-dbbf-7215-9747-624c4ef37e06",
  type: "page-type/record-property",
  slug: "proxy",
  propertySlug: "proxy",
  definition: "the proxy between a seat and its model",
  properties: [
    { pageProperty: "process-property/proxy-process", required: true, many: false },
    { pageProperty: "number-property/proxy-port", required: true, many: false },
    { pageProperty: "text-property/proxy-version", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat reaches one proxy or no proxy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A proxy short of a single field is no proxy at all.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
