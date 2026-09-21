import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const trims = {
  id: "01a0c541-1a15-7388-aa49-2af02f70d6c0",
  type: "page-type/page-property-entry",
  slug: "trims",
  propertySlug: "trims",
  definition: "every trim of every model year the make sells, one to a line",
  properties: [
    { pageProperty: "text-property/id", required: true, many: false },
    { pageProperty: "text-property/slug", required: true, many: false },
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "boolean-property/short-list", required: true, many: false },
    { pageProperty: "text-property/sources", required: true, many: false },
    { pageProperty: "text-property/exclusion-reason", required: false, many: false },
    { pageProperty: "number-property/msrp", required: false, many: false },
    { pageProperty: "select-property/powertrain-type", required: true, many: false },
    { pageProperty: "select-property/drive-layout", required: true, many: false },
    { pageProperty: "select-property/charging-port", required: false, many: false },
    { pageProperty: "select-property/battery-chemistry", required: false, many: false },
    { pageProperty: "select-property/iihs-rating", required: false, many: false },
    { pageProperty: "boolean-property/kill-switch-present", required: true, many: false },
    { pageProperty: "boolean-property/runs-offline", required: true, many: false },
    { pageProperty: "boolean-property/carplay-wireless", required: false, many: false },
    { pageProperty: "boolean-property/android-auto-wireless", required: false, many: false },
    { pageProperty: "boolean-property/federal-tax-credit-eligible", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field a row states no value for is unknown rather than false or empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field every row states is required, and no other field is.",
    },
  ],
  types: "ts",
} as const satisfies PagePropertyEntry
