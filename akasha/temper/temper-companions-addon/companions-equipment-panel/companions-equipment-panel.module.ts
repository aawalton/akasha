import type { Module } from "@akasha/code-system/module"

export const companionsEquipmentPanel = {
  id: "01a0611d-84d7-75a0-a415-4d8ca122a6b2",
  pageTypeSlug: "module",
  slug: "companions-equipment-panel",
  definition: "the panel showing a companion's gear beside the gear a build asks for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The optimal column is hidden until a target build is set.",
    },
  ],
} as const satisfies Module
