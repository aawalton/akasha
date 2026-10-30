import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyPlayer = {
  id: "01a06261-dc1d-7008-b575-b9785f2015e8",
  type: "page-type/module",
  slug: "spotify-player",
  definition: "the music Spotify plays on Alan's devices",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A read of the player answers null where nothing is playing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command to the player answers an empty body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A device named nowhere is the one Spotify calls active.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Recently played is a cursor page rather than an offset page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field Spotify adds later is carried through unread.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides which track to play.",
    },
  ],
  createdAt: "2026-09-02T13:49:35.645Z",
  updatedAt: "2026-10-30T16:23:20.442Z",
} as const satisfies Module
