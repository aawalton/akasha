import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOf2023PileOnTheStairs = {
  id: "01a0b4c6-c79e-71e3-a64e-0c9ee4840f2b",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-2023-pile-on-the-stairs",
  ownLength: 2.8808,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-2023"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5H783MhgupDfz1PqtSijBi",
      externalLink: "https://open.spotify.com/track/5H783MhgupDfz1PqtSijBi",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Pile On The Stairs",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "pileonthestairs|6tITG4T8LpC0msapZ4wXGA|172848",
  song: "song/the-holderness-family-pile-on-the-stairs",
} as const satisfies Track
