import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const races = {
  id: "01a0608a-c133-737f-a474-8e8f27869f5c",
  type: "page-type/module",
  slug: "races",
  definition: "every playable race with its Elder Scrolls Online race id and its alternate name",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The races are read from the race pages and held with the skill catalogue.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A race's place in this table is the index a build hash has.",
    },
  ],
} as const satisfies Module
