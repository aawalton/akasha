import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const michaelJacksonLoveSongs = {
  id: "01a0676a-d723-7082-a050-5b7705e2d2e9",
  type: "page-type/release",
  slug: "michael-jackson-love-songs",
  title: "Love Songs",
  partOfCollections: ["artist/michael-jackson"],
  position: 0,
  ownLength: 50.773683,
  ownProgress: 50.773683,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2002-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "00it4Y3J475KegT67qQ4o6",
      externalLink: "https://open.spotify.com/album/00it4Y3J475KegT67qQ4o6",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
