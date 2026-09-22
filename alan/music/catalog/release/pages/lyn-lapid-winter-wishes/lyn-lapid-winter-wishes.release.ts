import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidWinterWishes = {
  id: "01a0676a-d731-7027-b31e-55f0d558f74c",
  type: "page-type/release",
  slug: "lyn-lapid-winter-wishes",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2024-11-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "75CXdCIqKbAa4y8lfFc4qo",
      externalLink: "https://open.spotify.com/album/75CXdCIqKbAa4y8lfFc4qo",
    },
  ],
  title: "winter wishes",
} as const satisfies Release
