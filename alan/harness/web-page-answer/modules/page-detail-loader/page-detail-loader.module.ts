import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageDetailLoader = {
  id: "01a0c537-bbf6-7370-adb9-ace2d7253c8b",
  type: "page-type/module",
  slug: "page-detail-loader",
  definition: "the page a page type slug and a page href in a url name, and how it is drawn",
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
  ],
} as const satisfies Module
