import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const siteDocumentReading = {
  id: "01a0d5ab-cd7e-739f-94a3-f57107bc9e15",
  type: "page-type/module",
  slug: "site-document-reading",
  definition: "the site document a web app shows at a path, read for a route's loader",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path showing no site document answers not found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section naming no anchor or no title is not drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app's name in a tab is the title of its site document at the empty path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path showing a site document stating it is public is open to a reader who has not signed in.",
    },
  ],
  createdAt: "2026-09-24T23:06:41.406Z",
  updatedAt: "2026-09-27T14:07:30.000Z",
} as const satisfies Module
