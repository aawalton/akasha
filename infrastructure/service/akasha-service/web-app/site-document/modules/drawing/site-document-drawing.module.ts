import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const siteDocumentDrawing = {
  id: "01a0d5ab-cd7e-711b-912d-8956fa6862f2",
  type: "page-type/module",
  slug: "site-document-drawing",
  definition: "a site document drawn as its title, its lead and a card for each section",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A link out of the site opens in a new tab, and a link within it does not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A section's card carries the section's anchor, so a link can reach that card.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An email address is drawn as the HTML Cloudflare serves leaves it readable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A route may draw a piece of its own beneath a section's text, as a form is.",
    },
  ],
} as const satisfies Module
