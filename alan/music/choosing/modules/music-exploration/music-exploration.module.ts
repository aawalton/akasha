import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const musicExploration = {
  id: "01a06281-4d9d-7002-aee3-ff60658dc599",
  type: "page-type/module",
  slug: "music-exploration",
  definition: "the next artist or recording for Alan to hear for the first time",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A track offered is a track of the artist that track names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "What kind of recording a track is settles nothing about offering that track.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tracks of one artist sharing a normalised title are one piece.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A normalised title is the letters and digits of a title in lower case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track Alan has graded is never offered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A grade on a track reaches only the tracks sharing that track's normalised title.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No grade is read off a song, because Alan grades the recording he heard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tracks are ordered by title and then by slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An artist is new where no grade rests on them or on a track of theirs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade of `B-` or better is liked.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung of the ladder is written out here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An artist is loved where a liked grade rests on them or on a track of theirs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new artist with no track left to offer is no candidate.",
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
      statement: "A track by a loved artist is offered before a new artist.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The loved artist offered from is the artist loved most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Love is an artist's grade weighed a hundredfold over their liked tracks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An artist's own grade weighs as how far along the ladder that grade sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An artist Alan has not graded weighs below an artist graded `F`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer is exhausted where no track and no artist is left to offer.",
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
