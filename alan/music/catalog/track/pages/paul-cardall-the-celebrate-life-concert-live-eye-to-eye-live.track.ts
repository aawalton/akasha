import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveEyeToEyeLive = {
  id: "01a0b4c8-4381-78a3-b2a6-789353d1d302",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-eye-to-eye-live",
  ownLength: 3.8731,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5fsc0oB7bEEDgHwfmY8cCh",
      externalLink: "https://open.spotify.com/track/5fsc0oB7bEEDgHwfmY8cCh",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Eye to Eye - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "eyetoeyelive|7FQRbf8gbKw8KZQZAJWxH2|232386",
  song: "song/paul-cardall-eye-to-eye",
} as const satisfies Track
