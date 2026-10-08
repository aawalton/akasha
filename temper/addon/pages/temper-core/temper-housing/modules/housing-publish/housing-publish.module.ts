import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingPublish = {
  id: "01a06128-d5d1-7cd2-9610-4f78ee6356ae",
  type: "page-type/module",
  slug: "housing-publish",
  definition: "the port-to-friend holder, put where other add-ons and keybinds read it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The keybinds the add-on declares reach the holder by one global name.",
    },
  ],
  createdAt: "2026-09-02T08:07:41.265Z",
  updatedAt: "2026-09-22T07:01:25.000Z",
} as const satisfies Module
