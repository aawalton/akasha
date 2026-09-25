import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const site = {
  id: "01a06578-5721-7002-bdf0-39ef7ab35f68",
  type: "page-type/module",
  slug: "site",
  definition: "wanderinginn.com read through a headless browser",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every step of a read is given a time limit of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A challenge page is waited out before the page is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A challenge page that never clears is read anyway.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser that will not close is said aloud rather than thrown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's position is the place the chapter has in the table of contents.",
    },
    { decisionKind: "decision-kind/absence", statement: "Nothing here writes to the site." },
  ],
} as const satisfies Module
