import type { Module } from "../../code-system/modules/module.page-type.ts"

export const eventToPage = {
  id: "01a05c22-7bc9-7002-ae46-e40f41cc7836",
  pageTypeSlug: "module",
  slug: "event-to-page",
  definition: "a feed event turned into the values a calendar event page carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value the event does not hold is left unstated rather than written empty.",
    },
    {
      invariantKind: "departure",
      statement: "A link that is no http address is left unstated.",
    },
    {
      invariantKind: "departure",
      statement: "What registration a closed event once had is not carried.",
    },
    {
      invariantKind: "departure",
      statement: "An instant is written in UTC whatever zone the instant was read in.",
    },
  ],
} as const satisfies Module
