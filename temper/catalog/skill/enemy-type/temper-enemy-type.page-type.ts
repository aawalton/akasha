import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperEnemyType = {
  id: "01a0e2d1-c801-7cac-91a6-d4edd9dd1a78",
  type: "page-type/page-type",
  slug: "temper-enemy-type",
  definition: "a sort of enemy an ability's effect can hinge on",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An enemy type's key is the enemy type a skill's condition names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An enemy type the game names is titled as the game names it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
