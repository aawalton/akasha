import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyReleases = {
  id: "01a09c6f-017f-70b7-a662-48904bec6460",
  type: "page-type/module",
  slug: "spotify-releases",
  definition: "the albums an artist put out, and the tracks one of those albums holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Spotify refuses a page of more than ten albums with `Invalid limit`.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Spotify answers 403 to the bulk album read for an app registered now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An album's length is added up from the tracks that album holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An album is read to its last track, however many pages of tracks that takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An album an artist only appears on is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day an album states only a year or a month for is left as Spotify states it.",
    },
  ],
} as const satisfies Module
