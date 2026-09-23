import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2TaylorSwiftKaraokeReputation = {
  id: "01a0676a-d72c-7005-a874-49897296c1ba",
  type: "page-type/release",
  slug: "taylor-swift-2-taylor-swift-karaoke-reputation",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2018-03-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1MHuZZrGT36cXLxAQ5cLP3",
      externalLink: "https://open.spotify.com/album/1MHuZZrGT36cXLxAQ5cLP3",
    },
  ],
  title: "Taylor Swift Karaoke: reputation",
} as const satisfies Release
