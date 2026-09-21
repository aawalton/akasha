import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const michaelJacksonMichael = {
  id: "01a0676a-d724-7059-82e9-2c00b0fc8923",
  type: "page-type/release",
  slug: "michael-jackson-michael",
  title: "Michael",
  partOfCollections: ["artist/michael-jackson"],
  position: 0,
  ownLength: 27.391733,
  ownProgress: 27.391733,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2010-12-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5S7ySBYbWKsZdVYQrNtrWf",
      externalLink: "https://open.spotify.com/album/5S7ySBYbWKsZdVYQrNtrWf",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
