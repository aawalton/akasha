import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersPopulatedName = {
  id: "01a062ea-5f76-7fa2-a4a3-a8b92e04561d",
  pageTypeSlug: "module",
  slug: "characters-populated-name",
  definition: "the freshly read name where the game gave one, and the stored name otherwise",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Which of a stored and a freshly read name wins is settled here.",
    },
  ],
} as const satisfies Module
