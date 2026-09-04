import type { Domain } from "@akasha/domains/domain"

export const seatObservation = {
  id: "01a0658d-c92f-76f2-abb0-efb387b6515b",
  pageTypeSlug: "domain",
  slug: "seat-observation",
  definition: "what a seat holds because somebody looked",
  partSlugs: ["domain/seat-turn", "list/idle-live-seat"],
  invariants: [
    { invariantKind: "departure", statement: "Nobody could have settled an observation." },
    { invariantKind: "departure", statement: "An observation is whatever happened." },
    {
      invariantKind: "departure",
      statement: "An observation holds only while an agent is in the seat.",
    },
    { invariantKind: "departure", statement: "One run of an agent in a seat is a seat process." },
    { invariantKind: "departure", statement: "An agent taking a new seat is a presence start." },
    { invariantKind: "departure", statement: "An agent leaving a seat is a presence stop." },
    {
      invariantKind: "departure",
      statement: "An agent taking a seat the agent left is a presence resume.",
    },
    {
      invariantKind: "departure",
      statement: "An agent leaving a seat and taking the seat again is a presence restart.",
    },
    {
      invariantKind: "departure",
      statement: "An agent leaving a seat and another agent taking the seat is a presence reset.",
    },
    {
      invariantKind: "departure",
      statement: "An agent leaving a seat without being stopped made an unexpected stop.",
    },
    { invariantKind: "gap", statement: "A seat states whether an agent is present in the seat." },
  ],
} as const satisfies Domain
