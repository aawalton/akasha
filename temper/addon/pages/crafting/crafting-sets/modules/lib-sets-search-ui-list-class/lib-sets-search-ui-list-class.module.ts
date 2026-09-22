import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsSearchUiListClass = {
  id: "01a0623e-53a0-731f-9970-2086175cd397",
  type: "page-type/module",
  slug: "lib-sets-search-ui-list-class",
  definition: "the class the result list objects are made from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The class is placed on the game global LibSets_SearchUI_List by assignment.",
    },
  ],
} as const satisfies Module
