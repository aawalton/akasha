import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useSubpages = {
  id: "01a05cce-25ec-725b-9abc-9b019de92d9b",
  type: "page-type/module",
  slug: "use-subpages",
  definition: "the pages directly beneath a page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A parent relation aimed at another page type is never asked for this page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A parent relation stating no target is asked, since it may hold any page.",
    },
  ],
  createdAt: "2026-09-01T11:50:09.132Z",
  updatedAt: "2026-09-27T05:58:11.000Z",
} as const satisfies Module
