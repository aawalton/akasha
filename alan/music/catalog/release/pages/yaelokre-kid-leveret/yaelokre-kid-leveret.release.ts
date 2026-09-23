import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const yaelokreKidLeveret = {
  id: "01a0676a-d722-703d-b7ea-0e72093f9795",
  type: "page-type/release",
  slug: "yaelokre-kid-leveret",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/yaelokre"],
  position: 0,
  publishedAt: "2025-02-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0qua5UZqpo15MI7WeLXDvl",
      externalLink: "https://open.spotify.com/album/0qua5UZqpo15MI7WeLXDvl",
    },
  ],
  title: "Kid & Leveret",
} as const satisfies Release
