import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questsConstants = {
  id: "01a0635f-391c-775e-86c4-3735dadf76f5",
  type: "page-type/module",
  slug: "quests-constants",
  definition: "the name the quests saved variables are kept under and the version of their layout",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The saved-variables layout has the version the layout was written under.",
    },
  ],
  createdAt: "2026-09-02T18:26:20.060Z",
  updatedAt: "2026-09-22T02:23:36.000Z",
} as const satisfies Module
