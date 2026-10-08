import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiSharedSearch = {
  id: "01a0623c-2df8-77cc-aa20-7ad23b772da9",
  type: "page-type/module",
  slug: "sets-search-ui-shared-search",
  definition: "the text matching that decides whether a set answers a typed search",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A term after a minus sign excludes any set the term matches.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A colon in a bonus term limits the match to that bonus line.",
    },
  ],
  createdAt: "2026-09-02T13:08:26.232Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
