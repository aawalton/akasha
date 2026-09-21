import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingPtfPublish = {
  id: "01a06128-d5d1-7cd2-9610-4f78ee6356ae",
  type: "page-type/module",
  slug: "housing-ptf-publish",
  definition: "the port-to-friend holder, put where other add-ons and keybinds read it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The keybinds the add-on declares reach the holder by one global name.",
    },
  ],
} as const satisfies Module
