import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOf2023Maycember = {
  id: "01a0b4c6-c73a-745b-84e2-8a9699e444b0",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-2023-maycember",
  ownLength: 3.0668,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-2023"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2gU36T7Y9RyEXikgUstvD4",
      externalLink: "https://open.spotify.com/track/2gU36T7Y9RyEXikgUstvD4",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Maycember",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "maycember|6tITG4T8LpC0msapZ4wXGA|184008",
} as const satisfies Track
