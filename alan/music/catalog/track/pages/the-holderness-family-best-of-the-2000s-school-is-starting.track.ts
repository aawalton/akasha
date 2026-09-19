import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe2000sSchoolIsStarting = {
  id: "01a0b4c6-cd18-7a2e-9ffa-65e754fbb679",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-2000s-school-is-starting",
  ownLength: 1.776,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-2000s"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3IxNnqjPHILvRUdAfM3e7J",
      externalLink: "https://open.spotify.com/track/3IxNnqjPHILvRUdAfM3e7J",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "School Is Starting",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "schoolisstarting|6tITG4T8LpC0msapZ4wXGA|106560",
  song: "song/the-holderness-family-school-is-starting",
} as const satisfies Track
