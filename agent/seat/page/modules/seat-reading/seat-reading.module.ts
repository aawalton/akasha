import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatReading = {
  id: "01a05850-0f6a-7ed4-b9e5-6868da68bd0c",
  type: "module",
  slug: "seat-reading",
  definition: "what a seat states, read from the page standing for it here",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat is found by the agent's id rather than by the name of its page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A seat is found through the page type reached by its id rather than by a spelled slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat is found by the session the seat answers in where no seat has the id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An id the index does not have is answered with nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A root holding no seat index is refused rather than read as holding no seats.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value is answered under the key the old system's readers ask by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value naming a page is answered as the slug alone, and an assignment whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The root is the one the environment states, or the folder the file itself sits in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file loaded over the wire states its root, since its own path names no folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This module prints one line for each key this module was asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name reaches a seat's page whether or not that seat has a page yet.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder a seat's page sits in is asked of the index rather than spelled here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page is a seat by the page type filing it rather than by the folder it sits in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The mark a supervisor is read from is parted from its start moment by its last `-`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A mark naming no moment a supervisor started is no supervisor that can be read.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the seat pages of the old system.",
    },
  ],
} as const satisfies Module
