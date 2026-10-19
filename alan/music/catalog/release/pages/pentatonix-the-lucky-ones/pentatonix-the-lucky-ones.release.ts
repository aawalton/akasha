import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixTheLuckyOnes = {
  id: "01a0676a-d72d-703a-b3de-ec1003ef83c6",
  type: "page-type/release",
  slug: "pentatonix-the-lucky-ones",
  title: "The Lucky Ones",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-01-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7dNAb67rW0niZlc2m2crHx",
      externalLink: "https://open.spotify.com/album/7dNAb67rW0niZlc2m2crHx",
    },
  ],
  createdAt: "2026-09-03T13:17:30.285Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
