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
  ],
} as const satisfies Module
