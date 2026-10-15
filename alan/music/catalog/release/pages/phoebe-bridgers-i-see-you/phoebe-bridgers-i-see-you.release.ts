import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersISeeYou = {
  id: "01a0676a-d721-703e-a12a-79ad0b6e6262",
  type: "page-type/release",
  slug: "phoebe-bridgers-i-see-you",
  title: "I See You",
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  ownLength: 9.904966666666667,
  ownProgress: 9.904967,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-05-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ShsQlualbzfqeYZ3h1yQs",
      externalLink: "https://open.spotify.com/album/3ShsQlualbzfqeYZ3h1yQs",
    },
  ],
  createdAt: "2026-09-03T13:17:30.273Z",
  updatedAt: "2026-10-15T13:56:17.521Z",
} as const satisfies Release
