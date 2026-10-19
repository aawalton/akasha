import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixTheLuckyOnes2 = {
  id: "01a0676a-d72d-703b-9fb4-4b46772efcfd",
  type: "page-type/release",
  slug: "pentatonix-the-lucky-ones-2",
  title: "The Lucky Ones",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
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
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
