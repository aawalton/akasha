import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statReadingLines = {
  id: "01a155d4-d19b-7112-9521-83a2bfa453b4",
  type: "page-type/module",
  slug: "stat-reading-lines",
  definition: "a character's landed readings, read from their lines and chosen among",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A list the game keeps by index is read as a list in index order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line that does not read is kept aside with its number and why.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Readings are chosen newest first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading named by when it was captured takes every bar captured that second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading named by the start of its id is refused where that start fits two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A short id runs past the millisecond its id was minted in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Readings landed in one millisecond are told apart by their short ids.",
    },
  ],
  createdAt: "2026-10-19T20:22:53.082Z",
  updatedAt: "2026-10-24T18:26:44.401Z",
} as const satisfies Module
