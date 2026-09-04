import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const trackCandidate = {
  id: "01a06281-4d9d-7003-a5cb-de0f475a7e60",
  pageTypeSlug: "module",
  slug: "track-candidate",
  definition: "a Spotify search hit read as a track that could be played",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hit naming no uri is no candidate.",
    },
    {
      invariantKind: "departure",
      statement: "A candidate names every artist the hit names.",
    },
    {
      invariantKind: "departure",
      statement: "A candidate whose hit names no album carries a null album.",
    },
    {
      invariantKind: "departure",
      statement: "A candidate carries a null track id where Spotify gives no track id.",
    },
    {
      invariantKind: "departure",
      statement: "An artist wanted keeps a candidate whose artists hold that text.",
    },
    {
      invariantKind: "departure",
      statement: "An artist wanted is read without regard to case.",
    },
    {
      invariantKind: "departure",
      statement: "An artist wanted that is empty text keeps every candidate.",
    },
    {
      invariantKind: "departure",
      statement: "Candidates keep the order Spotify gave.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the network.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here ranks the hits.",
    },
  ],
} as const satisfies Module
