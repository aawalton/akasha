import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const readoutGroup = {
  id: "01a05446-e75e-7657-acda-566edc2b182e",
  type: "page-type/page-type",
  slug: "readout-group",
  definition: "the readings drawn together",
  parts: [
    "boolean-property/figure-off-scale",
    "readout-group/attributes",
    "readout-group/categorization",
    "readout-group/claude-usage",
    "readout-group/cost",
    "readout-group/inboxes",
    "readout-group/luck",
    "readout-group/safety",
    "readout-group/surplus",
    "readout-group/upkeep",
    "readout-group/values",
    "readout-group/workstation",
    "text-property/wire-key-name",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "boolean-property/figure-off-scale", required: false, many: false },
    { pageProperty: "text-property/wire-key-name", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The words a group is drawn under are its definition rather than a label of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group draws its readings in the order of the place each reading states.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
