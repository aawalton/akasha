import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hksTableReading = {
  id: "01a1557b-6545-7655-aa04-bb9d6f917b09",
  type: "page-type/module",
  slug: "hks-table-reading",
  definition: "a table, string or value of the game's Lua read out of the game's memory",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game runs Havok Script, whose layouts are learned here by reading memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value is sixteen bytes: its type in the first four, then its eight-byte payload.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string keeps its length eight bytes in and its text twenty bytes in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A table keeps where its entries start 32 bytes in and where they end 56 bytes in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry is 32 bytes: its key, then its value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number is an eight-byte float.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry whose key is nil is empty.",
    },
  ],
  createdAt: "2026-10-19T18:45:12.644Z",
  updatedAt: "2026-10-19T18:45:12.644Z",
} as const satisfies Module
