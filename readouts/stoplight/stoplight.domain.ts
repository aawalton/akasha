import type { Domain } from "akasha/domains/domain.page-type.ts"

export const stoplight = {
  id: "01a0655b-9cdc-7c65-845c-0fcbf73b73dc",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "stoplight",
  definition: "one color saying where a reading is now",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stoplight has five colors.",
    },
    {
      invariantKind: "departure",
      statement: "The colors from worst to best are black and red and yellow and green and blue.",
    },
    {
      invariantKind: "departure",
      statement: "Green is good and blue a stretch beyond green.",
    },
  ],
} as const satisfies Domain
