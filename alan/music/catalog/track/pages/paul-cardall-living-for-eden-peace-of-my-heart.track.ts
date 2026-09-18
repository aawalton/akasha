import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenPeaceOfMyHeart = {
  id: "01a0b4c8-4933-7eaa-831d-b14b718652a7",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-peace-of-my-heart",
  ownLength: 3.9604333333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1lF2ZATmKEQyad1QQMnlcD",
      externalLink: "https://open.spotify.com/track/1lF2ZATmKEQyad1QQMnlcD",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Peace Of My Heart",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "peaceofmyheart|7FQRbf8gbKw8KZQZAJWxH2|237626",
} as const satisfies Track
