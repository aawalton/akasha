import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loaderFollowing = {
  id: "01a0d586-9230-7c24-9d73-9656d5d8fa48",
  type: "page-type/module",
  slug: "loader-following",
  definition: "a route's server data read again when a page type it reads changes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A route whose loader reads pages follows the lists that loader reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a route holds a stream of its own beside any the page store holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change pushed to one of those lists runs the route's loaders again in place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Code reading pages outside the store follows their lists through the same call.",
    },
  ],
} as const satisfies Module
