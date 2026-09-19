import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe80sPollenInTheAir = {
  id: "01a0b4c6-ce94-7078-8be7-c5b75214b0df",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-80s-pollen-in-the-air",
  ownLength: 1.9835333333333334,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-80s"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "39ixqJwPO4ZBOD73dZY1mZ",
      externalLink: "https://open.spotify.com/track/39ixqJwPO4ZBOD73dZY1mZ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Pollen in the Air",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "pollenintheair|6tITG4T8LpC0msapZ4wXGA|119012",
  song: "song/the-holderness-family-pollen-in-the-air",
} as const satisfies Track
