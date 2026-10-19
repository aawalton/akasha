import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixTheLuckyOnes2 = {
  id: "01a0676a-d72d-703b-9fb4-4b46772efcfd",
  type: "page-type/release",
  slug: "pentatonix-the-lucky-ones-2",
  title: "The Lucky Ones",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 36.3261,
  ownProgress: 36.326167,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-02-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6doKrVnhuZB7ajkdvCDvyC",
      externalLink: "https://open.spotify.com/album/6doKrVnhuZB7ajkdvCDvyC",
    },
  ],
  createdAt: "2026-09-03T13:17:30.285Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Release
