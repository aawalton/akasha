import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveRedeemerLive = {
  id: "01a0b4c8-43f3-74d0-8bff-08401b4e65a1",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-redeemer-live",
  ownLength: 4.872283333333334,
  ownProgress: 4.872283333333334,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Redeemer - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "redeemerlive|7FQRbf8gbKw8KZQZAJWxH2|292337",
  song: "song/paul-cardall-redeemer",
  carriedBy: [
    {
      release: "release/paul-cardall-the-celebrate-life-concert-live",
      discNumber: 1,
      position: 12,
      externalId: "76r0PmRwQixyd7n13HWmNn",
      externalLink: "https://open.spotify.com/track/76r0PmRwQixyd7n13HWmNn",
    },
  ],
} as const satisfies Track
