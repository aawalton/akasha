import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const trackCandidate = {
  id: "01a06281-4d9d-7003-a5cb-de0f475a7e60",
  type: "module",
  slug: "track-candidate",
  definition: "a Spotify search hit read as a track that could be played",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hit naming no uri is no candidate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A candidate names every artist the hit names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A candidate whose hit names no album has a null album.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A candidate has a null track id where Spotify gives no track id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An artist wanted keeps a candidate whose artists have that text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An artist wanted is read without regard to case.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An artist wanted that is empty text keeps every candidate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Candidates keep the order Spotify gave.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the network.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here ranks the hits.",
    },
  ],
} as const satisfies Module
