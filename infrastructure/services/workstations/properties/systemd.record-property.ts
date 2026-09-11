import type { RecordProperty } from "akasha/pages/record-properties/record-property.page-type.types.ts"

export const systemd = {
  id: "01a05a3f-b42d-7f99-8339-43009bbd74bb",
  type: "record-property",
  slug: "systemd",
  propertySlug: "systemd",
  definition: "what the unit installed for a service states",
  properties: [
    { pageProperty: "text-property/after", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/wants", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/part-of", required: false, many: false },
    { pageProperty: "select-property/restart", required: false, many: false },
    { pageProperty: "number-property/restart-delay-seconds", required: false, many: false },
    { pageProperty: "number-property/restart-force-exit-status", required: false, many: false },
    { pageProperty: "number-property/success-exit-status", required: false, many: false },
    { pageProperty: "number-property/start-timeout-seconds", required: false, many: false },
    { pageProperty: "text-property/stops", required: false, many: true, maxCount: null },
    {
      pageProperty: "number-property/start-limit-interval-seconds",
      required: false,
      many: false,
    },
    { pageProperty: "text-property/schedule", required: false, many: false },
    { pageProperty: "number-property/jitter-seconds", required: false, many: false },
    { pageProperty: "number-property/accuracy-seconds", required: false, many: false },
    { pageProperty: "boolean-property/catch-up", required: false, many: false },
    { pageProperty: "text-property/wanted-by", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One record has every option the unit states.",
    },
    {
      invariantKind: "departure",
      statement: "The options a timer states sit here beside the options a service states.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The exit code preventing a restart is the one option a service states uncarried here.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
