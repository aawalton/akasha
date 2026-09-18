import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDailyDevotionsStrangers = {
  id: "01a0b4c8-5d1a-79f2-a402-161f58d0c215",
  type: "page-type/track",
  slug: "paul-cardall-daily-devotions-strangers",
  ownLength: 3.5137666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-daily-devotions"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5p2qIFYuKWcn3MROp7dCaK",
      externalLink: "https://open.spotify.com/track/5p2qIFYuKWcn3MROp7dCaK",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Strangers",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "strangers|7FQRbf8gbKw8KZQZAJWxH2|210826",
} as const satisfies Track
