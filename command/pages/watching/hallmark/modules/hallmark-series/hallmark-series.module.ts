import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hallmarkSeries = {
  id: "01a17496-2f57-775d-9eb5-986bf5f30c67",
  type: "page-type/module",
  slug: "hallmark-series",
  definition: "which Hallmark titles make up one series, and which category each title has",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A show that is talk, news, reality, a documentary or for children is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A show of four episodes or fewer that Wikipedia lists as a film is taken as that film.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A show whose name a series has is a part of that series.",
    },
  ],
  createdAt: "2026-10-25T19:42:42.006Z",
  updatedAt: "2026-10-25T19:42:42.006Z",
} as const satisfies Module
