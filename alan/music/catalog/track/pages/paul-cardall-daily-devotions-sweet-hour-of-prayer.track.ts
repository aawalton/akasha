import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDailyDevotionsSweetHourOfPrayer = {
  id: "01a0b4c8-5c84-7800-83b0-3c8ca9182738",
  type: "page-type/track",
  slug: "paul-cardall-daily-devotions-sweet-hour-of-prayer",
  ownLength: 3.552,
  ownProgress: 3.552,
  partOfCollections: ["release/paul-cardall-daily-devotions"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sweet Hour of Prayer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "sweethourofprayer|7FQRbf8gbKw8KZQZAJWxH2|213120",
  song: "song/paul-cardall-sweet-hour-of-prayer",
  carriedBy: [
    {
      release: "release/paul-cardall-daily-devotions",
      discNumber: 1,
      position: 1,
      externalId: "6GdMLWsKV4tSeCd3p47CGV",
      externalLink: "https://open.spotify.com/track/6GdMLWsKV4tSeCd3p47CGV",
    },
  ],
} as const satisfies Track
