import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const relationPicker = {
  id: "01a06164-b506-7002-bd6a-2888defdf06d",
  type: "page-type/module",
  slug: "relation-picker",
  definition: "React hook paginating the pages a relation may point at, narrowed by a search term.",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A picker asks for pages of the type its relation points at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target type no page type names is asked for under the provider's own type.",
    },
  ],
} as const satisfies Module
