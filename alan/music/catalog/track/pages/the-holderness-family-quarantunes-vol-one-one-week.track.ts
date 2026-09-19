import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyQuarantunesVolOneOneWeek = {
  id: "01a0b4c6-caa4-71ca-a94c-3f9f0aebf8a4",
  type: "page-type/track",
  slug: "the-holderness-family-quarantunes-vol-one-one-week",
  ownLength: 2.3166166666666665,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-quarantunes-vol-one"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3CYqrx6ZEgdp7LddqVHzbW",
      externalLink: "https://open.spotify.com/track/3CYqrx6ZEgdp7LddqVHzbW",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "One Week",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "oneweek|6tITG4T8LpC0msapZ4wXGA|138997",
  song: "song/the-holderness-family-one-week",
} as const satisfies Track
