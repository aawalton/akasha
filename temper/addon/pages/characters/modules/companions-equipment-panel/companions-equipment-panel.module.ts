import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsEquipmentPanel = {
  id: "01a0611d-84d7-75a0-a415-4d8ca122a6b2",
  type: "page-type/module",
  slug: "companions-equipment-panel",
  definition: "the panel showing a companion's gear beside the gear a build wants",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The optimal column is hidden until a target build is set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "With no companion chosen, or none captured, the panel says so through window-data-state.",
    },
  ],
} as const satisfies Module
