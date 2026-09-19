import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassStrangers = {
  id: "01a0b4c8-61ba-7d27-b560-2c8c485efe99",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-strangers",
  ownLength: 3.838433333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0mUsPfMgrnkGyiPRU0NCvI",
      externalLink: "https://open.spotify.com/track/0mUsPfMgrnkGyiPRU0NCvI",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Strangers",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "strangers|7FQRbf8gbKw8KZQZAJWxH2|230306",
  song: "song/paul-cardall-strangers",
} as const satisfies Track
