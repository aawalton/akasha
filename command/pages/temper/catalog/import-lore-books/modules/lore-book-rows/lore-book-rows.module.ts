import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreBookRows = {
  id: "01a0d5e2-67da-793a-a120-9e4f4cbe1aa0",
  type: "page-type/module",
  slug: "lore-book-rows",
  definition: "what the LoreBooks add-on holds of one book, as the values and rows of its page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the table holds is carried under the name its property gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key no property carries is refused rather than dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Shalidor pin keeps its place in its map's list, counted from one.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file or writes one.",
    },
  ],
} as const satisfies Module
