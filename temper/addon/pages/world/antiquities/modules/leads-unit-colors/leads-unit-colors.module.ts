import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const leadsUnitColors = {
  id: "01a06274-b08a-70d6-827b-f1317738371a",
  type: "page-type/module",
  slug: "leads-unit-colors",
  definition: "the color of a lead's rarity and its remaining time",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A lead with no rarity is in the primary text color.",
    },
  ],
  createdAt: "2026-09-02T14:10:09.674Z",
  updatedAt: "2026-09-25T15:18:03.000Z",
} as const satisfies Module
