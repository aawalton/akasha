import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDailyDevotionsStrangers = {
  id: "01a0b4c8-5d1a-79f2-a402-161f58d0c215",
  type: "page-type/track",
  slug: "paul-cardall-daily-devotions-strangers",
  ownLength: 3.5137666666666667,
  ownProgress: 3.5137666666666667,
  partOfCollections: ["release/paul-cardall-daily-devotions"],
  status: "completed",
  unit: "unit/minutes",
  title: "Strangers",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "strangers|7FQRbf8gbKw8KZQZAJWxH2|210826",
  song: "song/paul-cardall-strangers",
  carriedBy: [
    {
      release: "release/paul-cardall-daily-devotions",
      discNumber: 1,
      position: 5,
      externalId: "5p2qIFYuKWcn3MROp7dCaK",
      externalLink: "https://open.spotify.com/track/5p2qIFYuKWcn3MROp7dCaK",
    },
  ],
} as const satisfies Track
