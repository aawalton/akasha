import type { Module } from "@akasha/code-system/module"

export const pageQueryHold = {
  id: "01a06874-32dc-7000-837c-b1fa87bcc846",
  pageTypeSlug: "module",
  slug: "page-query-hold",
  definition: "an answer to a page query kept for as long as a caller says to keep it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing is held until a caller says how long to hold it for.",
    },
    {
      invariantKind: "departure",
      statement: "An answer held longer than that is asked for again rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "An answer is asked for once and given to every caller naming the same key.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here bounds how many answers are held.",
    },
  ],
} as const satisfies Module
