import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenMoreHope = {
  id: "01a0b4c8-4bc7-7ddf-9918-8c537d4c907f",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-more-hope",
  ownLength: 2.854433333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 19,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3XO8BHtCOObbWlmT1WERxl",
      externalLink: "https://open.spotify.com/track/3XO8BHtCOObbWlmT1WERxl",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "More Hope",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "morehope|7FQRbf8gbKw8KZQZAJWxH2|171266",
  song: "song/paul-cardall-more-hope",
} as const satisfies Track
