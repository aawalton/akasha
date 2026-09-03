import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const site = {
  id: "01a06578-5721-7002-bdf0-39ef7ab35f68",
  pageTypeSlug: "module",
  slug: "site",
  definition: "wanderinginn.com read through a headless browser",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every step of a read is given a time limit of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A challenge page is waited out before the page is read.",
    },
    {
      invariantKind: "departure",
      statement: "A challenge page that never clears is read anyway.",
    },
    {
      invariantKind: "departure",
      statement: "A browser that will not close is said aloud rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter's position is the place the chapter holds in the table of contents.",
    },
  ],
} as const satisfies Module
