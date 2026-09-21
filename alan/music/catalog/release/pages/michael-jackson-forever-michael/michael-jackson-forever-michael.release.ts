import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const michaelJacksonForeverMichael = {
  id: "01a0676a-d71e-702a-a223-23c38bb5b8db",
  type: "page-type/release",
  slug: "michael-jackson-forever-michael",
  title: "Forever, Michael",
  partOfCollections: ["artist/michael-jackson"],
  position: 0,
  ownLength: 33.6735,
  ownProgress: 33.6735,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "1975-01-16",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6leeBdAohG7zhybC3Cmu8W",
      externalLink: "https://open.spotify.com/album/6leeBdAohG7zhybC3Cmu8W",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
