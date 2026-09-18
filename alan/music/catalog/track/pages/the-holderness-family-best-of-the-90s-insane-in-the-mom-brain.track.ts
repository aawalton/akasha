import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe90sInsaneInTheMomBrain = {
  id: "01a0b4c6-cff3-77c3-8633-aa3f222b8f07",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-90s-insane-in-the-mom-brain",
  ownLength: 1.57735,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-90s"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7mxl7yQPkzQdYyvLaqyn87",
      externalLink: "https://open.spotify.com/track/7mxl7yQPkzQdYyvLaqyn87",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Insane in the Mom Brain",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "insaneinthemombrain|6tITG4T8LpC0msapZ4wXGA|94641",
} as const satisfies Track
