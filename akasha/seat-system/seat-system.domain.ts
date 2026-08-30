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
      statement: "A seat's page stands while an agent is present in it, and goes when none is.",
    },
    {
      invariantKind: "departure",
      statement: "What a seat holds is either declared of it or observed of it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat's id is the agent's id, so what an agent has read is found by the seat it works from.",
    },
    {
      invariantKind: "constraint",
      statement:
        "What is observed of a seat changes every few seconds, so a write that commits cannot carry it.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A seat outlives the editor showing it and the agent sitting in it, so neither can be asked where it stands.",
    },
    {
      invariantKind: "gap",
      statement: "A seat is a page the akasha system holds.",
    },
  ],
} as const satisfies Domain
