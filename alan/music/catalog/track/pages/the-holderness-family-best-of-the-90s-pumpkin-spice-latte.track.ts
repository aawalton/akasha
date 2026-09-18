import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe90sPumpkinSpiceLatte = {
  id: "01a0b4c6-d10c-7afa-8d4e-3f5e589f2ddf",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-90s-pumpkin-spice-latte",
  ownLength: 2.6893,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-90s"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "638rN57DGb8f3NthQJxkdA",
      externalLink: "https://open.spotify.com/track/638rN57DGb8f3NthQJxkdA",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Pumpkin Spice Latte",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "pumpkinspicelatte|6tITG4T8LpC0msapZ4wXGA|161358",
} as const satisfies Track
