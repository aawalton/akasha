import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const siteTelling = {
  id: "01a18818-57d6-7856-8288-8c907a4ba8ca",
  type: "page-type/module",
  slug: "site-telling",
  definition: "what a browser extension says on the page Alan is watching",
  code: "ts",
  runsInABrowser: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What an extension says on a page is drawn in the browser's own colors.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What it says is taken away again after a moment.",
    },
  ],
  createdAt: "2026-10-29T14:37:39.156Z",
  updatedAt: "2026-10-29T14:37:39.156Z",
} as const satisfies Module
