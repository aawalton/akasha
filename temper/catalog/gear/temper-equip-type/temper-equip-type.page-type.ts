import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperEquipType = {
  id: "01a0e108-4383-759e-9c5d-2d4067ab9605",
  type: "page-type/page-type",
  slug: "temper-equip-type",
  definition: "a kind of place the game says a piece is equipped in",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["relation-property/slot-equip-type"],
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
      decisionKind: "decision-kind/departure",
      statement: "An equip type is named by its page here rather than by any slot page.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
