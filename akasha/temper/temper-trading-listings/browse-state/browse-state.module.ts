import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const browseState = {
  id: "01a060a7-02f3-7e84-9e98-799da64c05e4",
  pageTypeSlug: "module",
  slug: "browse-state",
  definition: "what to search next as each page of guild store listings arrives",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A guild whose pages are exhausted gives way to the next guild in the queue.",
    },
    {
      invariantKind: "departure",
      statement: "A page is asked for only once the cooldown says the search may go.",
    },
    {
      invariantKind: "departure",
      statement: "A search already awaiting an answer blocks another search.",
    },
    {
      invariantKind: "departure",
      statement: "An empty queue finishes the search.",
    },
  ],
} as const satisfies Module
