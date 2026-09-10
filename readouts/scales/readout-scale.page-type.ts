import type { PageType } from "@akasha/pages/page-type"

export const readoutScale = {
  id: "01a05446-e75f-756a-b8d9-4288a350957f",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "readout-scale",
  definition: "what turns a reading into a color",
  pluralSlug: "readout-scales",
  parts: [
    "readout-scale/activity-calories",
    "readout-scale/allowance-hours",
    "readout-scale/attribute-points",
    "readout-scale/backlog-count",
    "readout-scale/capacity-hours",
    "readout-scale/daily-inbox",
    "readout-scale/green-day-units",
    "readout-scale/live-count",
    "readout-scale/lowest-inbox-count",
    "readout-scale/plant-grams",
    "readout-scale/safety-level",
    "readout-scale/sleep-hours",
    "readout-scale/surplus-hours",
    "number-property/black-at",
    "number-property/blue-at",
    "number-property/green-at",
    "number-property/orange-at",
    "number-property/red-at",
    "number-property/yellow-at",
    "text-property/earned-color-slug",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "number-property/black-at", required: false, many: false },
    { pageProperty: "number-property/red-at", required: false, many: false },
    { pageProperty: "number-property/orange-at", required: false, many: false },
    { pageProperty: "number-property/yellow-at", required: false, many: false },
    { pageProperty: "number-property/green-at", required: false, many: false },
    { pageProperty: "number-property/blue-at", required: false, many: false },
    { pageProperty: "text-property/earned-color-slug", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A scale is named by the readings drawn against that scale and belongs to no reading.",
    },
    {
      invariantKind: "departure",
      statement: "A scale states only the rungs the scale has.",
    },
    {
      invariantKind: "departure",
      statement: "Rising numbers make a scale ascend and falling ones descend.",
    },
    {
      invariantKind: "departure",
      statement: "Black is at zero unless a scale moves black.",
    },
    {
      invariantKind: "constraint",
      statement: "Orange is a rung a stoplight strip cannot draw.",
    },
    {
      invariantKind: "departure",
      statement: "A scale states the color an earned reading takes rather than a rung.",
    },
    {
      invariantKind: "departure",
      statement: "A scale stating no earned color has no reading earn a color against that scale.",
    },
  ],
  types: "ts",
} as const satisfies PageType
