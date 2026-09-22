import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCraftType = {
  id: "01a0616b-2cdf-7001-a24c-0dd3c96e1a6e",
  type: "page-type/page-type",
  slug: "temper-craft-type",
  definition: "a craft holding the item traits a player researches",
  extends: ["page-type/temper-pursuit-thing"],
  parts: ["number-property/eso-craft-type-id"],
  properties: [{ pageProperty: "number-property/eso-craft-type-id", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A craft type gathers the research lines one crafting skill covers.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
