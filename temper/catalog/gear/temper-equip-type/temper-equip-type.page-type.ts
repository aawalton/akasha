import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperEquipType = {
  id: "01a0e108-4383-759e-9c5d-2d4067ab9605",
  type: "page-type/page-type",
  slug: "temper-equip-type",
  definition: "a kind of place the game says a piece is equipped in",
  extends: ["page-type/temper-catalog-thing"],
  properties: [{ pageProperty: "number-property/equip-type", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An equip type states the number the game gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An equip type is titled with the name the game shows it by.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "One Hand and Two Hand keep the tooltip's names, not the game's One-Handed and Two-Handed.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
