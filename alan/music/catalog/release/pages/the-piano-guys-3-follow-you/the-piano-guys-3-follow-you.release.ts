import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3FollowYou = {
  id: "01a0676a-d71e-7020-adc9-a3ebc6395257",
  type: "page-type/release",
  slug: "the-piano-guys-3-follow-you",
  ownLength: 3.186,
  ownProgress: 3.186,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2021-10-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6v8bgQGWQQLrId09KPevU3",
      externalLink: "https://open.spotify.com/album/6v8bgQGWQQLrId09KPevU3",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Follow You",
} as const satisfies Release
