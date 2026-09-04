import type { Module } from "@akasha/code-system/module"

export const seatWakeMatchDecide = {
  id: "01a0686d-9d5e-701b-a93a-2cab28c6152b",
  pageTypeSlug: "module",
  slug: "seat-wake-match-decide",
  definition: "whether inbound work revives an absent seat",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat whose page stands has an agent in it and needs no waking.",
    },
    {
      invariantKind: "departure",
      statement: "An absent seat is revived only where the work matches one of its wake sources.",
    },
    {
      invariantKind: "departure",
      statement: "Every decision carries the reason it was reached for.",
    },
  ],
} as const satisfies Module
