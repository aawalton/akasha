import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyQuarantunesVolOneEndOfTheRoll = {
  id: "01a0b4c6-cbec-767f-9b2e-20f2adfd7361",
  type: "page-type/track",
  slug: "the-holderness-family-quarantunes-vol-one-end-of-the-roll",
  ownLength: 4.8518,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-quarantunes-vol-one"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "18aYUP185lK6fBqnsGCXWP",
      externalLink: "https://open.spotify.com/track/18aYUP185lK6fBqnsGCXWP",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "End of the Roll",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "endoftheroll|6tITG4T8LpC0msapZ4wXGA|291108",
} as const satisfies Track
