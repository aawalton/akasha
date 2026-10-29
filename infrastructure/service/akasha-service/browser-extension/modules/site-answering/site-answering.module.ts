import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const siteAnswering = {
  id: "01a18818-57d6-7820-ae19-339d392feef3",
  type: "page-type/module",
  slug: "site-answering",
  definition: "a request a browser extension puts to alanwalton.com, answered or given up on",
  code: "ts",
  runsInABrowser: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An extension reaches alanwalton.com with the session Alan's browser keeps there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request taking longer than fifteen seconds is reported as no answer.",
    },
  ],
  createdAt: "2026-10-29T14:37:39.156Z",
  updatedAt: "2026-10-29T14:37:39.156Z",
} as const satisfies Module
