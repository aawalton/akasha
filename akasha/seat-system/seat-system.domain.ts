import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const seatSystem = {
  id: "01a04f23-d2da-7b20-a543-142de383ac28",
  pageTypeSlug: "domain",
  slug: "seat-system",
  definition: "a place an agent works from, and what stands there while it does",
  partSlugs: ["page-type/seat"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's page stands while an agent is present in it.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's page goes when none is.",
    },
    {
      invariantKind: "departure",
      statement: "What a seat holds is either declared of it or observed of it.",
    },
    {
      invariantKind: "upkeep",
      statement: "Every value observed of a seat is declared on its page type.",
    },
    {
      invariantKind: "departure",
      statement: "A seat's id is the agent's id.",
    },
    {
      invariantKind: "departure",
      statement: "What an agent has read is found by the seat it works from.",
    },
    {
      invariantKind: "constraint",
      statement: "What is observed of a seat changes every few seconds.",
    },
    {
      invariantKind: "constraint",
      statement: "A write that commits cannot carry what is observed of a seat.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every writer of a seat's uncommitted values takes a lock keyed on the file it writes.",
    },
    {
      invariantKind: "constraint",
      statement: "A seat outlives the editor showing it and the agent sitting in it.",
    },
  ],
} as const satisfies Domain
