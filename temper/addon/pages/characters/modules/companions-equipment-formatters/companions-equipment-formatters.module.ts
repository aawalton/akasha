import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsEquipmentFormatters = {
  id: "01a0611d-84d4-73da-a5b9-80d34d8c2696",
  type: "page-type/module",
  slug: "companions-equipment-formatters",
  definition: "a line of text for a companion's armor, jewelry or weapon slot",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty slot formats as a dash rather than as blank text.",
    },
  ],
} as const satisfies Module
