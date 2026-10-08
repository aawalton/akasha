import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useDescendantPages = {
  id: "01a05cce-25ec-7573-afac-aed8bece2063",
  type: "page-type/module",
  slug: "use-descendant-pages",
  definition: "the pages of a page type and of every page type beneath it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page type is asked once, and each page beneath it comes back once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gather that goes wrong carries its reason rather than an empty list of pages.",
    },
  ],
  createdAt: "2026-09-01T11:50:09.132Z",
  updatedAt: "2026-09-15T18:36:57.000Z",
} as const satisfies Module
