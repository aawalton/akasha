import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const michaelJacksonAnthologyTheBestOfMichaelJackson = {
  id: "01a0676a-d717-7025-ac7d-7c480b0da0e4",
  type: "page-type/release",
  slug: "michael-jackson-anthology-the-best-of-michael-jackson",
  title: "Anthology: The Best Of Michael Jackson",
  partOfCollections: ["artist/michael-jackson"],
  position: 0,
  ownLength: 145.80155,
  ownProgress: 145.80155,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  publishedAt: "1986-11-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "36K3cD4i4TK0JkU1sU2wOD",
      externalLink: "https://open.spotify.com/album/36K3cD4i4TK0JkU1sU2wOD",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
