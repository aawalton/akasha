import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const musicExploration = {
  id: "01a06281-4d9d-7002-aee3-ff60658dc599",
  pageTypeSlug: "module",
  type: "module",
  slug: "music-exploration",
  definition: "the next artist or song for Alan to hear for the first time",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A song offered is a song the artist wrote themselves.",
    },
    {
      invariantKind: "departure",
      statement: "A song offered is a song the artist performs.",
    },
    {
      invariantKind: "departure",
      statement: "Songs of one artist sharing a normalised title are one song.",
    },
    {
      invariantKind: "departure",
      statement: "A normalised title is the letters and digits of a title in lower case.",
    },
    {
      invariantKind: "departure",
      statement: "A song Alan has graded is never offered.",
    },
    {
      invariantKind: "departure",
      statement: "A song sharing a normalised title with a graded song is never offered.",
    },
    {
      invariantKind: "departure",
      statement: "Songs are ordered by title and then by slug.",
    },
    {
      invariantKind: "departure",
      statement:
        "An artist is new where no grade rests on that artist or on any song of that artist.",
    },
    {
      invariantKind: "departure",
      statement:
        "An artist is loved where `B-` or better rests on that artist or on a song of that artist.",
    },
    {
      invariantKind: "departure",
      statement: "A new artist with no song left to offer is no candidate.",
    },
    {
      invariantKind: "departure",
      statement: "Two artists are alike by the genres both name over the genres either names.",
    },
    {
      invariantKind: "departure",
      statement: "A new artist scores as the highest likeness to a single loved artist.",
    },
    {
      invariantKind: "departure",
      statement: "A tie on that score goes to the artist naming a greater number of loved genres.",
    },
    {
      invariantKind: "departure",
      statement: "A tie still holding goes by title and then by slug.",
    },
    {
      invariantKind: "departure",
      statement: "Where no artist is loved the new artist offered is the first by title.",
    },
    {
      invariantKind: "departure",
      statement: "A song by a loved artist is offered before a new artist.",
    },
    {
      invariantKind: "departure",
      statement: "The loved artist offered from is the artist loved most.",
    },
    {
      invariantKind: "departure",
      statement: "Love is an artist's own grade weighed a hundredfold over their liked songs.",
    },
    {
      invariantKind: "departure",
      statement: "The answer is exhausted where no song and no artist is left to offer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the page store.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the network.",
    },
  ],
} as const satisfies Module
