import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveVoicesLive = {
  id: "01a0b4c8-43a7-7ab2-b16a-89859269c6ed",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-voices-live",
  ownLength: 4.829183333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7hQUMHIye7uBL0wrBMUslB",
      externalLink: "https://open.spotify.com/track/7hQUMHIye7uBL0wrBMUslB",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Voices - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "voiceslive|7FQRbf8gbKw8KZQZAJWxH2|289751",
  song: "song/paul-cardall-voices",
} as const satisfies Track
