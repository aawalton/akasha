import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe90sItWasntMe = {
  id: "01a0b4c6-d190-799f-983d-8b170cb7265f",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-90s-it-wasnt-me",
  ownLength: 1.8277,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-90s"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ivG0P3MQP0cd9dWcJA0HJ",
      externalLink: "https://open.spotify.com/track/1ivG0P3MQP0cd9dWcJA0HJ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "It Wasn't Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "itwasntme|6tITG4T8LpC0msapZ4wXGA|109662",
  song: "song/the-holderness-family-it-wasnt-me",
} as const satisfies Track
