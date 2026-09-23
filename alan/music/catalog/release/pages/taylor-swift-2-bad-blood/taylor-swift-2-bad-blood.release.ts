import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2BadBlood = {
  id: "01a0676a-d718-7004-bdae-65f5596e4804",
  type: "page-type/release",
  slug: "taylor-swift-2-bad-blood",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2015-05-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Tv3rrFNdXGtTeP1plX2xE",
      externalLink: "https://open.spotify.com/album/1Tv3rrFNdXGtTeP1plX2xE",
    },
  ],
  title: "Bad Blood",
} as const satisfies Release
