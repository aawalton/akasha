import type { PageType } from "@akasha/pages/page-type"

export const carMake = {
  id: "01a0659e-e27a-7b1f-bb44-5601b4fc9699",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "car-make",
  definition: "a company that builds cars",
  pluralSlug: "car-makes",
  extends: ["page-type/car"],
  parts: [
    "file-property/trims",
    "number-property/founding-year",
    "text-property/charging-network-access",
    "text-property/country",
    "text-property/drm-policy",
    "text-property/electrification-strategy",
    "text-property/kill-switch-policy",
    "text-property/nacs-adoption",
    "text-property/parent-corporation",
    "text-property/reliability-notes",
  ],
  properties: [
    { pageProperty: "text-property/charging-network-access", required: true, many: false },
    { pageProperty: "text-property/country", required: true, many: false },
    { pageProperty: "text-property/drm-policy", required: true, many: false },
    { pageProperty: "text-property/electrification-strategy", required: true, many: false },
    { pageProperty: "number-property/founding-year", required: true, many: false },
    { pageProperty: "text-property/kill-switch-policy", required: true, many: false },
    { pageProperty: "text-property/nacs-adoption", required: true, many: false },
    { pageProperty: "text-property/parent-corporation", required: true, many: false },
    { pageProperty: "text-property/reliability-notes", required: true, many: false },
    { pageProperty: "file-property/trims", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "A make names no model that make builds.",
    },
  ],
  types: "ts",
} as const satisfies PageType
