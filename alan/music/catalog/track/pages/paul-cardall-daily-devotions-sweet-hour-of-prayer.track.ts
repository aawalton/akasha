import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDailyDevotionsSweetHourOfPrayer = {
  id: "01a0b4c8-5c84-7800-83b0-3c8ca9182738",
  type: "page-type/track",
  slug: "paul-cardall-daily-devotions-sweet-hour-of-prayer",
  ownLength: 3.552,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-daily-devotions"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6GdMLWsKV4tSeCd3p47CGV",
      externalLink: "https://open.spotify.com/track/6GdMLWsKV4tSeCd3p47CGV",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sweet Hour of Prayer",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "sweethourofprayer|7FQRbf8gbKw8KZQZAJWxH2|213120",
  song: "song/paul-cardall-sweet-hour-of-prayer",
} as const satisfies Track
