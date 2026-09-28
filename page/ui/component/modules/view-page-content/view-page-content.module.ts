import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const viewPageContent = {
  id: "01a06259-518d-7b02-91ff-6612d1ce5b85",
  type: "page-type/module",
  slug: "view-page-content",
  definition: "the body of a view page, with its tabs and their settings",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page types a view may list leave out view, page type and nav, known by slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav page or page type with no title is named by its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the page says when it has no view is read live from web phrases.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A view's settings changed by nobody signed in are kept in the browser and not written.",
    },
  ],
} as const satisfies Module
