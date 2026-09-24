import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const authProvider = {
  id: "01a06582-2737-7f5c-8019-8dd5e784db92",
  type: "page-type/module",
  slug: "auth-provider",
  definition: "the reader the page store is told of, and the page types held before a route draws",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reader is read on the server and passed in rather than asked for here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No token is held, so the session cookie alone carries the reader to a route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The account a tree below this is drawn for is passed in beside the reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The store follows each page it holds through the site's own two push routes.",
    },
  ],
} as const satisfies Module
