import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonSpotifySingles = {
  id: "01a0676a-d72a-7006-a6e0-69af00b651ec",
  type: "page-type/release",
  slug: "zara-larsson-spotify-singles",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2017-04-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3RH0hpUJfWcCNEjuypAtGC",
      externalLink: "https://open.spotify.com/album/3RH0hpUJfWcCNEjuypAtGC",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Spotify Singles",
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
