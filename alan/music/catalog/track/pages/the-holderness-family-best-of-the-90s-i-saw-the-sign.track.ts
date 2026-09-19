import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe90sISawTheSign = {
  id: "01a0b4c6-d07c-7427-80c5-8a82398453ca",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-90s-i-saw-the-sign",
  ownLength: 2.7737666666666665,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-90s"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5x02A8uOkDe3XwXYTbkpp3",
      externalLink: "https://open.spotify.com/track/5x02A8uOkDe3XwXYTbkpp3",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "I Saw the Sign",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "isawthesign|6tITG4T8LpC0msapZ4wXGA|166426",
  song: "song/the-holderness-family-i-saw-the-sign",
} as const satisfies Track
