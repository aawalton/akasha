import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const priceCache = {
  id: "01a0615d-c218-7c2e-8456-f4c21cdb9bd4",
  type: "page-type/module",
  slug: "price-cache",
  definition: "a price held for a while so a source is asked once",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A held price is dropped five minutes after the last drop.",
    },
  ],
} as const satisfies Module
