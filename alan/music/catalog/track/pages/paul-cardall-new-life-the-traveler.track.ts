import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeTheTraveler = {
  id: "01a0b4c8-3ea2-7e9a-a39d-3968feba7332",
  type: "page-type/track",
  slug: "paul-cardall-new-life-the-traveler",
  ownLength: 1.6971,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-new-life"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1oMBWc9ad1NGtGufOkB5X2",
      externalLink: "https://open.spotify.com/track/1oMBWc9ad1NGtGufOkB5X2",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Traveler",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thetraveler|7FQRbf8gbKw8KZQZAJWxH2|101826",
  song: "song/paul-cardall-the-traveler",
} as const satisfies Track
