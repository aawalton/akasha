import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const viewPipeline = {
  id: "01a05b69-4552-769b-b58a-70a14d2f7cb3",
  type: "page-type/module",
  slug: "view-pipeline",
  definition: "the pipeline answering with the pages a view holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A view holds the pages of its own page type and of every page type under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type is under another where its chain of extends reaches that type.",
    },
  ],
  createdAt: "2026-09-01T05:20:20.818Z",
  updatedAt: "2026-10-30T13:58:34.623Z",
} as const satisfies Module
