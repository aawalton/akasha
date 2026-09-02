import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const spotifyTracks = {
  id: "01a06261-dc1d-700a-bfca-ad92b08a3e74",
  pageTypeSlug: "module",
  slug: "spotify-tracks",
  definition: "one track read by its Spotify id",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A track names its own artists.",
    },
    {
      invariantKind: "constraint",
      statement: "Spotify answers 403 to the bulk track read for an app registered now.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Spotify answers 403 to audio features and audio analysis for an app registered now.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks for audio features.",
    },
  ],
} as const satisfies Module
