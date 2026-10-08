import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const weaponSlots = {
  id: "01a060b8-08c6-7f16-b8a5-2cc75abc76f5",
  type: "page-type/module",
  slug: "weapon-slots",
  definition: "the main hand, off hand and poison positions a weapon bar holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The weapon slots are read from their pages in display order.",
    },
  ],
  createdAt: "2026-09-02T06:04:28.742Z",
  updatedAt: "2026-09-27T02:49:23.000Z",
} as const satisfies Module
