import type { Module } from "@akasha/code/module"

export const gachaDrawContext = {
  id: "01a0655e-d39a-7d78-92a5-0e8f9375946d",
  pageTypeSlug: "module",
  slug: "gacha-draw-context",
  definition: "the personas and rates one draw is settled against",
  code: "ts",
  invariants: [
    {
      invariantKind: "gap",
      statement: "`persona-cover-image` is no page type the pages system holds.",
    },
    {
      invariantKind: "constraint",
      statement: "A draw reads an empty pool as a persona with nothing to show.",
    },
    {
      invariantKind: "departure",
      statement: "A draw context whose images went unread is refused rather than answered empty.",
    },
  ],
} as const satisfies Module
