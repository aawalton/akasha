import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaWeAreBornYouVeChanged = {
  id: "01a0a59c-0a42-7bdb-ad19-cbca09c621a0",
  type: "page-type/track",
  slug: "sia-we-are-born-you-ve-changed",
  ownLength: 3.1864333333333335,
  ownProgress: 0,
  partOfCollections: ["release/sia-we-are-born"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2CfNBLuqXzbrY3omMaKDvp",
      externalLink: "https://open.spotify.com/track/2CfNBLuqXzbrY3omMaKDvp",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "You've Changed",
} as const satisfies Track
