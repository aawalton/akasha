import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyTracks = {
  id: "01a06261-dc1d-700a-bfca-ad92b08a3e74",
  type: "page-type/module",
  slug: "spotify-tracks",
  definition: "a track read by its Spotify id",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A track names its own artists.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Spotify answers 403 to the bulk track read for an app registered now.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Spotify answers 403 to audio features and audio analysis for an app registered now.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks for audio features.",
    },
  ],
} as const satisfies Module
