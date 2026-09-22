import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kDaPopStars = {
  id: "01a0676a-d727-7006-9fcf-952905cdd20e",
  type: "page-type/release",
  slug: "k-da-pop-stars",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/k-da"],
  position: 0,
  publishedAt: "2018-11-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6kCiN9VNYVhF2TDekK1mzz",
      externalLink: "https://open.spotify.com/album/6kCiN9VNYVhF2TDekK1mzz",
    },
  ],
  title: "POP/STARS",
} as const satisfies Release
