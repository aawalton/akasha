import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pagesNaming = {
  id: "01a179d5-68a7-7c4e-9ce9-9d6f8fd3e867",
  type: "page-type/module",
  slug: "pages-naming",
  definition: "the pages of one page type, each under its slug",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type's pages are read once and held for every later caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug two pages carry names the first page read.",
    },
  ],
  createdAt: "2026-10-26T20:09:51.526Z",
  updatedAt: "2026-10-26T20:09:51.526Z",
} as const satisfies Module
