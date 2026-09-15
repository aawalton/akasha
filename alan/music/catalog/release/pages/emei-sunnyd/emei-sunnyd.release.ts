import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiSunnyd = {
  id: "01a0676a-d72a-7046-a4f7-94312fdff606",
  type: "release",
  slug: "emei-sunnyd",
  title: "SUNNYD",
  partOfCollections: ["artist/emei"],
  position: 0,
  ownLength: 2.111233,
  ownProgress: 2.111233,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2024-10-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1D8kmnJy5pX2oxTsydOEYZ",
      externalLink: "https://open.spotify.com/album/1D8kmnJy5pX2oxTsydOEYZ",
    },
  ],
} as const satisfies Release
