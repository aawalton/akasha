import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe90sItsGonnaBeMay = {
  id: "01a0b4c6-d037-709e-bc78-127bf2f5ad0b",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-90s-its-gonna-be-may",
  ownLength: 1.81725,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-90s"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4DVvbcl2Grx8nowT4FMQzc",
      externalLink: "https://open.spotify.com/track/4DVvbcl2Grx8nowT4FMQzc",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "It's Gonna Be May",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "itsgonnabemay|6tITG4T8LpC0msapZ4wXGA|109035",
} as const satisfies Track
