import type { Module } from "@akasha/code-system/module"

export const housingPtfPublish = {
  id: "01a06128-d5d1-7cd2-9610-4f78ee6356ae",
  pageTypeSlug: "module",
  slug: "housing-ptf-publish",
  definition: "the port-to-friend holder, put where other add-ons and keybinds read it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The keybinds the add-on declares reach the holder by one global name.",
    },
  ],
} as const satisfies Module
