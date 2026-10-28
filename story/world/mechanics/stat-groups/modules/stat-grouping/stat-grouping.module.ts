import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statGrouping = {
  id: "01a18303-9351-7171-9f2f-499d97d9c63b",
  type: "page-type/module",
  slug: "stat-grouping",
  definition: "a character's stats gathered under the groups its world names",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A group is shown only while it holds a stat the player has been shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group stating slots counts the stats shown under it out of those slots.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Groups are shown in their display order, and those stating none after, by title.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the store, so what is handed in is all that is read.",
    },
  ],
  createdAt: "2026-10-28T14:56:52.048Z",
  updatedAt: "2026-10-28T14:56:52.048Z",
} as const satisfies Module
