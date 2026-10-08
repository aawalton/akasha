import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraYourBlood = {
  id: "01a0676a-d732-7023-a019-ca55a8591d4f",
  type: "page-type/release",
  slug: "aurora-your-blood",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2023-11-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Mrbtd9OIIh1XPiTMqHaHC",
      externalLink: "https://open.spotify.com/album/6Mrbtd9OIIh1XPiTMqHaHC",
    },
  ],
  title: "Your Blood",
  createdAt: "2026-09-03T13:17:30.290Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
