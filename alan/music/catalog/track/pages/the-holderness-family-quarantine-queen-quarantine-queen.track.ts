import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyQuarantineQueenQuarantineQueen = {
  id: "01a0b4c6-ccca-730c-a6b4-96c19acac148",
  type: "page-type/track",
  slug: "the-holderness-family-quarantine-queen-quarantine-queen",
  ownLength: 2.2291,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-quarantine-queen"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2SbKgJhTdgFNRbil5s6uWd",
      externalLink: "https://open.spotify.com/track/2SbKgJhTdgFNRbil5s6uWd",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Quarantine Queen",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "quarantinequeen|6tITG4T8LpC0msapZ4wXGA|133746",
  song: "song/the-holderness-family-quarantine-queen",
} as const satisfies Track
