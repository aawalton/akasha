import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const musicExploration = {
  id: "01a06281-4d9d-7002-aee3-ff60658dc599",
  type: "page-type/module",
  slug: "music-exploration",
  definition: "the next artist or song for Alan to hear for the first time",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A song offered is a song the artist performs.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Whose composition a song is settles nothing about offering that song.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Songs of one artist sharing a normalised title are one song.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A normalised title is the letters and digits of a title in lower case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song Alan has graded is never offered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song sharing a normalised title with a graded song is never offered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Songs are ordered by title and then by slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An artist is new where no grade rests on that artist or on any song of that artist.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An artist is loved where `B-` or better rests on that artist or on a song of that artist.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new artist with no song left to offer is no candidate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two artists are alike by the genres both name over the genres either names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new artist scores as the highest likeness to a single loved artist.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tie on that score goes to the artist naming a greater number of loved genres.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tie still holding goes by title and then by slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where no artist is loved the new artist offered is the first by title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song by a loved artist is offered before a new artist.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The loved artist offered from is the artist loved most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Love is an artist's own grade weighed a hundredfold over their liked songs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer is exhausted where no song and no artist is left to offer.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the page store.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the network.",
    },
  ],
} as const satisfies Module
