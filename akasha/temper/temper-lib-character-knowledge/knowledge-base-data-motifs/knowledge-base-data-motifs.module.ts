import type { Module } from "@akasha/code-system/module"

export const knowledgeBaseDataMotifs = {
  id: "01a0622b-dc54-77f2-87d9-b420778a2255",
  pageTypeSlug: "module",
  slug: "knowledge-base-data-motifs",
  definition: "the pre-scanned item ids upstream ships for motif books",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These ids are what upstream BaseData for API 101050 states.",
    },
  ],
} as const satisfies Module
