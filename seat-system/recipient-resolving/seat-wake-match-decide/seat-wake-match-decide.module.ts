import type { Module } from "@akasha/code/module"

export const seatWakeMatchDecide = {
  id: "01a0686d-9d5e-701b-a93a-2cab28c6152b",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-wake-match-decide",
  definition: "whether inbound work revives an absent seat",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat whose page is there has an agent in it and needs no waking.",
    },
    {
      invariantKind: "departure",
      statement:
        "An absent seat is revived only where the work matches a wake source that seat states.",
    },
    {
      invariantKind: "departure",
      statement: "Every decision has the reason that decision was reached for.",
    },
  ],
} as const satisfies Module
