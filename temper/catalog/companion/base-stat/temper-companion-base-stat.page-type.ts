import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionBaseStat = {
  id: "01a0ded3-d592-77b3-9bed-24fef59501e9",
  type: "page-type/page-type",
  slug: "temper-companion-base-stat",
  definition: "a stat every companion starts with before gear or skills",
  extends: ["page-type/temper-companion-thing"],
  parts: ["number-property/effect-value"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "relation-property/companion-metric", required: true, many: false },
    { pageProperty: "text-property/trait-effect-type", required: true, many: false },
    { pageProperty: "number-property/effect-value", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A base stat is one companion metric moved by one flat amount.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every companion starts with every base stat.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
