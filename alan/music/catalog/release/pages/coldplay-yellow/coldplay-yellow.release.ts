import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayYellow = {
  id: "01a0676a-d731-7047-b224-1b77d39a83b5",
  type: "page-type/release",
  slug: "coldplay-yellow",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2000-06-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3TQANfSeYZtl5rpNjYyR6U",
      externalLink: "https://open.spotify.com/album/3TQANfSeYZtl5rpNjYyR6U",
    },
  ],
  title: "Yellow",
} as const satisfies Release
