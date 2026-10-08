import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const knowledgeCuratedMotifs = {
  id: "01a0622b-dc56-709a-8da0-de660a3730f7",
  type: "page-type/module",
  slug: "knowledge-curated-motifs",
  definition: "which motif book carries which style and chapter",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading the numbered entries misses the named entry beside the numbered entries.",
    },
  ],
  createdAt: "2026-09-02T12:50:36.758Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
