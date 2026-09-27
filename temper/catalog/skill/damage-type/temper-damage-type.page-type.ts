import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperDamageType = {
  id: "01a0e2d1-c801-7eef-9a99-4bc07882db41",
  type: "page-type/page-type",
  slug: "temper-damage-type",
  definition: "a kind of damage an ability deals",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A damage type is titled as the game names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A damage type's key is the damage type a skill's effect names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A damage type's place is the game's damage type number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A damage type the game numbers nowhere is placed after every numbered one.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
