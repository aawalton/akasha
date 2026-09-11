import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const notFoundNotice = {
  id: "01a08e04-ae95-7615-b97a-27cdf8ec5cda",
  type: "module",
  slug: "not-found-notice",
  definition: "what a route draws in place of a page that is not there",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every route drawing nothing found draws the same notice.",
    },
    {
      invariantKind: "departure",
      statement: "The notice says the page was not found rather than why it was not found.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here answers with a status, because a route here draws in the browser.",
    },
  ],
} as const satisfies Module
