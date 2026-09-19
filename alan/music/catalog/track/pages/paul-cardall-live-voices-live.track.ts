import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveVoicesLive = {
  id: "01a0b4c8-58d9-7bf2-96d0-091eb2da109b",
  type: "page-type/track",
  slug: "paul-cardall-live-voices-live",
  ownLength: 3.6477666666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-live"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3rwmNEybeOPzshmdvD4u71",
      externalLink: "https://open.spotify.com/track/3rwmNEybeOPzshmdvD4u71",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Voices - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "voiceslive|7FQRbf8gbKw8KZQZAJWxH2|218866",
  song: "song/paul-cardall-voices",
} as const satisfies Track
