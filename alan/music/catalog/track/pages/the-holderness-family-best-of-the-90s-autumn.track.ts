import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe90sAutumn = {
  id: "01a0b4c6-d134-77fe-9117-235f87e1c37f",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-90s-autumn",
  ownLength: 3.480366666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-90s"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1G5sDRJS4nBCqebKocFMCZ",
      externalLink: "https://open.spotify.com/track/1G5sDRJS4nBCqebKocFMCZ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Autumn",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "autumn|6tITG4T8LpC0msapZ4wXGA|208822",
  song: "song/the-holderness-family-autumn",
} as const satisfies Track
