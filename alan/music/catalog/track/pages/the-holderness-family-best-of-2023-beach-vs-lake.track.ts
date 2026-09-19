import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOf2023BeachVsLake = {
  id: "01a0b4c6-c5f2-7339-87af-04c6b182e7d4",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-2023-beach-vs-lake",
  ownLength: 2.9008,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-2023"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5uDBlfN8WCxV2mL01PSuoc",
      externalLink: "https://open.spotify.com/track/5uDBlfN8WCxV2mL01PSuoc",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Beach vs Lake",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "beachvslake|6tITG4T8LpC0msapZ4wXGA|174048",
  song: "song/the-holderness-family-beach-vs-lake",
} as const satisfies Track
