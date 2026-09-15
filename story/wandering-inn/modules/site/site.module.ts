import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const site = {
  id: "01a06578-5721-7002-bdf0-39ef7ab35f68",
  type: "module",
  slug: "site",
  definition: "wanderinginn.com read through a headless browser",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every step of a read is given a time limit of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A challenge page is waited out before the page is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A challenge page that never clears is read anyway.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A browser that will not close is said aloud rather than thrown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chapter's position is the place the chapter has in the table of contents.",
    },
  ],
} as const satisfies Module
