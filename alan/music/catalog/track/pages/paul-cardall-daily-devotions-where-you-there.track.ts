import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDailyDevotionsWhereYouThere = {
  id: "01a0b4c8-5cab-7d23-8ad1-265061f37245",
  type: "page-type/track",
  slug: "paul-cardall-daily-devotions-where-you-there",
  ownLength: 5.409766666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-daily-devotions"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5mwuB2tzSZ7E4OtaxZnh0j",
      externalLink: "https://open.spotify.com/track/5mwuB2tzSZ7E4OtaxZnh0j",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Where You There?",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "whereyouthere|7FQRbf8gbKw8KZQZAJWxH2|324586",
  song: "song/paul-cardall-where-you-there",
} as const satisfies Track
