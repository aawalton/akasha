import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiSunnyd = {
  id: "01a0676a-d72a-7046-a4f7-94312fdff606",
  type: "page-type/release",
  slug: "emei-sunnyd",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2024-10-11",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1D8kmnJy5pX2oxTsydOEYZ",
      externalLink: "https://open.spotify.com/album/1D8kmnJy5pX2oxTsydOEYZ",
    },
  ],
  title: "SUNNYD",
} as const satisfies Release
