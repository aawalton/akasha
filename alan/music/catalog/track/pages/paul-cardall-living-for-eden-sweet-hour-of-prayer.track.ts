import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenSweetHourOfPrayer = {
  id: "01a0b4c8-4c31-744f-b06c-0c9d25116ade",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-sweet-hour-of-prayer",
  ownLength: 3.1856166666666668,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 22,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6TAj9AlhfJHud6rYIcvaJY",
      externalLink: "https://open.spotify.com/track/6TAj9AlhfJHud6rYIcvaJY",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sweet Hour Of Prayer",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "sweethourofprayer|7FQRbf8gbKw8KZQZAJWxH2|191137",
  song: "song/paul-cardall-sweet-hour-of-prayer",
} as const satisfies Track
