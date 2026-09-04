import type { Domain } from "@akasha/domain-system/domain"

export const stoplight = {
  id: "01a0655b-9cdc-7c65-845c-0fcbf73b73dc",
  pageTypeSlug: "domain",
  slug: "stoplight",
  definition: "one color saying where a reading stands now",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stoplight has five colors, worst to best: black, red, yellow, green, blue.",
    },
    {
      invariantKind: "departure",
      statement: "Green is good and blue a stretch beyond it.",
    },
  ],
} as const satisfies Domain
