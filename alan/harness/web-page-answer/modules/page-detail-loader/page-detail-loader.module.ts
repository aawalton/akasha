import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageDetailLoader = {
  id: "01a0c537-bbf6-7370-adb9-ace2d7253c8b",
  type: "page-type/module",
  slug: "page-detail-loader",
  definition: "how a website shows the page at a path",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav page is drawn as the page that nav item points at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type reaching no page is looked for again among that type's descendants.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page href reaching no page is answered 404.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav page's tab icon is drawn again as soon as a nav page changes.",
    },
  ],
  createdAt: "2026-09-21T18:25:59.286Z",
  updatedAt: "2026-10-30T16:16:18.952Z",
} as const satisfies Module
