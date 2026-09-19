import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOf2022ThisIsACoat = {
  id: "01a0b4c6-c803-7186-acf4-e3480c7be381",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-2022-this-is-a-coat",
  ownLength: 3.3308,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-2022"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2cYnyCnlMwtNGPGHk1GaKH",
      externalLink: "https://open.spotify.com/track/2cYnyCnlMwtNGPGHk1GaKH",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "This Is A Coat",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "thisisacoat|6tITG4T8LpC0msapZ4wXGA|199848",
  song: "song/the-holderness-family-this-is-a-coat",
} as const satisfies Track
