import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const stoplight = {
  id: "01a0655b-9cdc-7c65-845c-0fcbf73b73dc",
  type: "domain",
  slug: "stoplight",
  definition: "one color saying where a reading is now",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stoplight has five colors.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The colors from worst to best are black and red and yellow and green and blue.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Green is good and blue a stretch beyond green.",
    },
  ],
} as const satisfies Domain
