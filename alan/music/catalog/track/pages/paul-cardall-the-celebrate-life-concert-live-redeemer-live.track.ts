import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveRedeemerLive = {
  id: "01a0b4c8-43f3-74d0-8bff-08401b4e65a1",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-redeemer-live",
  ownLength: 4.872283333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "76r0PmRwQixyd7n13HWmNn",
      externalLink: "https://open.spotify.com/track/76r0PmRwQixyd7n13HWmNn",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Redeemer - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "redeemerlive|7FQRbf8gbKw8KZQZAJWxH2|292337",
  song: "song/paul-cardall-redeemer",
} as const satisfies Track
