import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexWarrenGiveYouLoveGiveYouLove = {
  id: "01a0a59d-d3ae-7ff4-81ea-ecc58ba6ba98",
  type: "track",
  slug: "alex-warren-give-you-love-give-you-love",
  ownLength: 3.05665,
  ownProgress: 0,
  partOfCollections: ["release/alex-warren-give-you-love"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6yfa7stvsbbuDzFsHKG8ez",
      externalLink: "https://open.spotify.com/track/6yfa7stvsbbuDzFsHKG8ez",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Give You Love",
} as const satisfies Track
