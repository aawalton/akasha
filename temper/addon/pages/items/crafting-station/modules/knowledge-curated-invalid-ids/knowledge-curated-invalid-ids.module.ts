import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const knowledgeCuratedInvalidIds = {
  id: "01a0622b-dc57-7c4b-8f62-fa6a29f7844e",
  type: "page-type/module",
  slug: "knowledge-curated-invalid-ids",
  definition: "the items kept out of the style and chapter tables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "An item upstream marks unavailable contributes to no style.",
    },
  ],
  createdAt: "2026-09-02T12:50:36.759Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
