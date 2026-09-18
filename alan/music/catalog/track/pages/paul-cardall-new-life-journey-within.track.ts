import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeJourneyWithin = {
  id: "01a0b4c8-3f44-7eb9-b864-11238bb866aa",
  type: "page-type/track",
  slug: "paul-cardall-new-life-journey-within",
  ownLength: 3.8451,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-new-life"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4AUxtPG7iQogzKibwivfe8",
      externalLink: "https://open.spotify.com/track/4AUxtPG7iQogzKibwivfe8",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Journey Within",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "journeywithin|7FQRbf8gbKw8KZQZAJWxH2|230706",
} as const satisfies Track
