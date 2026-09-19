import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe2000sHotOutHere = {
  id: "01a0b4c6-cd41-7c16-8725-3039362db928",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-2000s-hot-out-here",
  ownLength: 2.0796,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-2000s"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1eSQTixZg5XDh6Iz5miiAE",
      externalLink: "https://open.spotify.com/track/1eSQTixZg5XDh6Iz5miiAE",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Hot Out Here",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "hotouthere|6tITG4T8LpC0msapZ4wXGA|124776",
  song: "song/the-holderness-family-hot-out-here",
} as const satisfies Track
