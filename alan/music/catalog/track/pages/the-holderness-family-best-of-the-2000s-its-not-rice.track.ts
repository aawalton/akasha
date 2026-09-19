import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe2000sItsNotRice = {
  id: "01a0b4c6-cd8f-7760-b530-0a5162d53cdc",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-2000s-its-not-rice",
  ownLength: 2.9951833333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-2000s"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6gXXiv85d5blzpePnNYVLQ",
      externalLink: "https://open.spotify.com/track/6gXXiv85d5blzpePnNYVLQ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "It's Not Rice",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "itsnotrice|6tITG4T8LpC0msapZ4wXGA|179711",
  song: "song/the-holderness-family-its-not-rice",
} as const satisfies Track
