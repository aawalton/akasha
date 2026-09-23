import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const yaelokreOrigins = {
  id: "01a0676a-d726-7048-b529-6edf564bf2e5",
  type: "page-type/release",
  slug: "yaelokre-origins",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/yaelokre"],
  position: 0,
  publishedAt: "2025-10-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2n78hLuH141A3MtGN0EPgR",
      externalLink: "https://open.spotify.com/album/2n78hLuH141A3MtGN0EPgR",
      lastSyncedAt: "2025-10-30",
    },
  ],
  title: "Origins",
} as const satisfies Release
