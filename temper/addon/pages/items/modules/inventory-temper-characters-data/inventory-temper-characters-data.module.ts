import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryTemperCharactersData = {
  id: "01a06258-b534-75d4-879d-e12689eb4c8a",
  type: "page-type/module",
  slug: "inventory-temper-characters-data",
  definition: "the characters add-on's saved data and chosen builds, read when present",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A choice made over a build Temper no longer sets the character up as is ignored.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.860Z",
  updatedAt: "2026-11-01T19:05:45.327Z",
} as const satisfies Module
