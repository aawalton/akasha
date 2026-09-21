import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioSacred = {
  id: "01a0676a-d728-7037-9d43-1d680f2aac51",
  type: "page-type/release",
  slug: "jessica-baio-sacred",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2026-01-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3s9VGa9gsznVyJmXJfvjjN",
      externalLink: "https://open.spotify.com/album/3s9VGa9gsznVyJmXJfvjjN",
      lastSyncedAt: "2026-01-31",
    },
  ],
  title: "SACRED",
} as const satisfies Release
