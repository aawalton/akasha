import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperResearchLine = {
  id: "01a0616b-2cdf-7005-a903-e1d072da4881",
  type: "page-type/page-type",
  slug: "temper-research-line",
  definition: "a shape of item whose traits a player researches",
  extends: ["page-type/temper-pursuit-thing"],
  parts: [
    "number-property/trait-index",
    "page-property-entry/traits",
    "text-property/trait-name",
    "relation-property/research-line-craft",
  ],
  properties: [
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "page-property-entry/traits", required: true, many: false },
    { pageProperty: "relation-property/research-line-craft", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A research line hangs beneath the craft type the line is researched under.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
