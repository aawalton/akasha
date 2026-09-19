import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe90sLoseMyMind = {
  id: "01a0b4c6-d059-7b2c-9a4f-93432dcb35a7",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-90s-lose-my-mind",
  ownLength: 2.0349333333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-90s"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4YRzOCeziKIVFtSm3bJASP",
      externalLink: "https://open.spotify.com/track/4YRzOCeziKIVFtSm3bJASP",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Lose My Mind",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "losemymind|6tITG4T8LpC0msapZ4wXGA|122096",
  song: "song/the-holderness-family-lose-my-mind",
} as const satisfies Track
