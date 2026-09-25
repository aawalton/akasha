import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const readoutScale = {
  id: "01a05446-e75f-756a-b8d9-4288a350957f",
  type: "page-type/page-type",
  slug: "readout-scale",
  definition: "what turns a reading into a color",
  parts: [
    "number-property/black-at",
    "number-property/blue-at",
    "number-property/green-at",
    "number-property/orange-at",
    "number-property/red-at",
    "number-property/yellow-at",
    "readout-scale/allowance-hours",
    "readout-scale/attribute-points",
    "readout-scale/backlog-count",
    "readout-scale/capacity-hours",
    "readout-scale/daily-inbox",
    "readout-scale/gap-count",
    "readout-scale/green-day-units",
    "readout-scale/live-count",
    "readout-scale/lowest-inbox-count",
    "readout-scale/refusal-count",
    "readout-scale/safety-level",
    "readout-scale/sleep-hours",
    "readout-scale/surplus-hours",
    "readout-scale/wisdom-points",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "number-property/black-at", required: false, many: false },
    { pageProperty: "number-property/red-at", required: false, many: false },
    { pageProperty: "number-property/orange-at", required: false, many: false },
    { pageProperty: "number-property/yellow-at", required: false, many: false },
    { pageProperty: "number-property/green-at", required: false, many: false },
    { pageProperty: "number-property/blue-at", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A scale is named by the readings drawn against that scale and belongs to no reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scale states only the rungs the scale has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rising numbers make a scale ascend and falling ones descend.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Black is at zero unless a scale moves black.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Orange is a rung a stoplight strip cannot draw.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
