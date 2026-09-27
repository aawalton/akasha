import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCraftType = {
  id: "01a0616b-2cdf-7001-a24c-0dd3c96e1a6e",
  type: "page-type/page-type",
  slug: "temper-craft-type",
  definition: "one of the game's crafting skills",
  extends: ["page-type/temper-pursuit-thing"],
  parts: ["number-property/eso-craft-type-id"],
  properties: [
    { pageProperty: "number-property/eso-craft-type-id", required: true, many: false },
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A craft type gathers the research lines one crafting skill covers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every crafting skill is a craft type, whether or not it has research lines.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A craft type is titled as the game's crafting skill line names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A craft type's key is its game constant's suffix, lowercased.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A craft type's place is the game's craft type number.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
