import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiListClass = {
  id: "01a0623e-53a0-731f-9970-2086175cd397",
  type: "page-type/module",
  slug: "sets-search-ui-list-class",
  definition: "the class of the result list objects",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The class is reached by importing the function that answers it.",
    },
  ],
  createdAt: "2026-09-02T13:10:46.944Z",
  updatedAt: "2026-09-22T13:44:02.000Z",
} as const satisfies Module
