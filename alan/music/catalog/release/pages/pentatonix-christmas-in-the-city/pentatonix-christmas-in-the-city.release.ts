import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixChristmasInTheCity = {
  id: "01a0676a-d71a-703a-8c60-097fa4e01c2a",
  type: "page-type/release",
  slug: "pentatonix-christmas-in-the-city",
  title: "Christmas in the City",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 46.091167,
  ownProgress: 46.091167,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-10-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7xaP8xn3tGJYPg3xwcbe9s",
      externalLink: "https://open.spotify.com/album/7xaP8xn3tGJYPg3xwcbe9s",
      lastSyncedAt: "2026-01-09",
    },
  ],
} as const satisfies Release
