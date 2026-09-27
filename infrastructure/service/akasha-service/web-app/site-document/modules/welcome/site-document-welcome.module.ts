import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const siteDocumentWelcome = {
  id: "01a0e2a5-7b74-7a34-95c9-61c41a059cba",
  type: "page-type/module",
  slug: "site-document-welcome",
  definition: "a site document drawn as the front of a web app",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The front is the document's title over its lead and its description.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The front is drawn again whenever a site document changes.",
    },
  ],
} as const satisfies Module
