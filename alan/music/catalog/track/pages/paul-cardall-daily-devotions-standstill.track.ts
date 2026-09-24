import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDailyDevotionsStandstill = {
  id: "01a0b4c8-5da1-7791-9835-5ad54db44103",
  type: "page-type/track",
  slug: "paul-cardall-daily-devotions-standstill",
  ownLength: 2.080433333333333,
  ownProgress: 2.080433333333333,
  partOfCollections: ["release/paul-cardall-daily-devotions"],
  status: "completed",
  unit: "unit/minutes",
  title: "Standstill",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "standstill|7FQRbf8gbKw8KZQZAJWxH2|124826",
  song: "song/paul-cardall-standstill",
  carriedBy: [
    {
      release: "release/paul-cardall-daily-devotions",
      discNumber: 1,
      position: 9,
      externalId: "2J8FOZPCFBt7mFllJZqHAw",
      externalLink: "https://open.spotify.com/track/2J8FOZPCFBt7mFllJZqHAw",
    },
  ],
} as const satisfies Track
