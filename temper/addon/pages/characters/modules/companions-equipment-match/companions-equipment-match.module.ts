import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsEquipmentMatch = {
  id: "01a0611d-84d5-7bd2-a667-02cb3cf8945b",
  type: "page-type/module",
  slug: "companions-equipment-match",
  definition: "how far a companion's worn gear is from the build a player is aiming at",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each gear slot is judged on weight and on trait and on quality apart.",
    },
  ],
} as const satisfies Module
