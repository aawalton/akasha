import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsEquipmentRows = {
  id: "01a0611d-84d8-7602-83da-54ad2d53b4dd",
  type: "page-type/module",
  slug: "companions-equipment-rows",
  definition: "the controls drawing a gear section of the equipment panel",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Column positions are fixed numbers rather than measured from content.",
    },
  ],
} as const satisfies Module
