import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveTheWidowsMansionLive = {
  id: "01a0b4c8-5903-7e45-bed7-915da6d56bdf",
  type: "page-type/track",
  slug: "paul-cardall-live-the-widows-mansion-live",
  ownLength: 3.6317666666666666,
  ownProgress: 3.6317666666666666,
  partOfCollections: ["release/paul-cardall-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Widow's Mansion - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thewidowsmansionlive|7FQRbf8gbKw8KZQZAJWxH2|217906",
  song: "song/paul-cardall-the-widows-mansion",
  carriedBy: [
    {
      release: "release/paul-cardall-live",
      discNumber: 1,
      position: 12,
      externalId: "6mLCMAGsrFjEJkNf1xBDbj",
      externalLink: "https://open.spotify.com/track/6mLCMAGsrFjEJkNf1xBDbj",
    },
  ],
} as const satisfies Track
