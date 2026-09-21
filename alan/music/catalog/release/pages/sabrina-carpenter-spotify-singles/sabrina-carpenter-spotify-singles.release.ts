import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterSpotifySingles = {
  id: "01a0676a-d72a-7005-abe9-b96f1df8dd60",
  type: "page-type/release",
  slug: "sabrina-carpenter-spotify-singles",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2023-10-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2kJnIPJHIRZlfOx0TZEKBP",
      externalLink: "https://open.spotify.com/album/2kJnIPJHIRZlfOx0TZEKBP",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Spotify Singles",
} as const satisfies Release
