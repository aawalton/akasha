import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogUnusedTables = {
  id: "01a1555e-41d2-7eff-9e80-ba6d4af82eaa",
  type: "page-type/module",
  slug: "catalog-unused-tables",
  definition: "a table the catalog add-on once saved that nothing collects or reads any longer",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A table nothing collects or reads is removed from the saved variables at load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The quest catalog is such a table, since quests are read from the world zones.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lore library probe is such a table.",
    },
  ],
  createdAt: "2026-10-19T18:13:23.025Z",
  updatedAt: "2026-10-19T18:13:23.025Z",
} as const satisfies Module
