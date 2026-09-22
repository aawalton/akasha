import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsSearchUiSharedState = {
  id: "01a0623c-2df8-79ac-aad0-2590ee5b5c47",
  type: "page-type/module",
  slug: "lib-sets-search-ui-shared-state",
  definition: "the icons and localized words the search window shows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every favourite icon is formatted at 24 by 24 pixels.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A set is taken to have twelve bonus lines at the most.",
    },
  ],
} as const satisfies Module
