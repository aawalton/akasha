import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraWalkingInTheAir = {
  id: "01a0676a-d730-7013-a4bb-6e2c3007431f",
  type: "page-type/release",
  slug: "aurora-walking-in-the-air",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2019-11-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2fMBFV1ko7rH9ATaqkhnVB",
      externalLink: "https://open.spotify.com/album/2fMBFV1ko7rH9ATaqkhnVB",
    },
  ],
  title: "Walking In The Air",
} as const satisfies Release
