import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const siteDocumentHead = {
  id: "01a0e2c2-28e0-754e-80b9-1eb3686dd4d3",
  type: "page-type/module",
  slug: "site-document-head",
  definition: "a web app's root route, drawn under the site document at its empty path",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The root reads its title and description again whenever a site document changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The phrases a root's loader read seed every route drawn beneath it.",
    },
  ],
  createdAt: "2026-09-27T12:06:10.400Z",
  updatedAt: "2026-09-27T14:19:30.000Z",
} as const satisfies Module
