import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsEvents = {
  id: "01a0611d-84d9-7779-9148-3a4577993184",
  type: "page-type/module",
  slug: "companions-events",
  definition: "the game events the companion add-on watches",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every listener is named after the add-on so a reload can drop those listeners.",
    },
  ],
  createdAt: "2026-09-02T07:55:19.641Z",
  updatedAt: "2026-09-22T13:56:42.000Z",
} as const satisfies Module
