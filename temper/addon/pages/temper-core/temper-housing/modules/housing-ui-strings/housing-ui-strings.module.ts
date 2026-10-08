import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingUiStrings = {
  id: "01a06128-d5d5-7969-b568-4feea14f801b",
  type: "page-type/module",
  slug: "housing-ui-strings",
  definition: "every phrase the housing window shows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A phrase is put on the holder rather than into a game string id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "English is the only language carried.",
    },
  ],
  createdAt: "2026-09-02T08:07:41.269Z",
  updatedAt: "2026-09-25T13:18:28.000Z",
} as const satisfies Module
