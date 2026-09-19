import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe2000sBadSitter = {
  id: "01a0b4c6-ce39-7969-afc2-9cef6a62208e",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-2000s-bad-sitter",
  ownLength: 2.1096,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-2000s"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "42AAlTcntyAJU3J6HCjLVV",
      externalLink: "https://open.spotify.com/track/42AAlTcntyAJU3J6HCjLVV",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Bad Sitter",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "badsitter|6tITG4T8LpC0msapZ4wXGA|126576",
  song: "song/the-holderness-family-bad-sitter",
} as const satisfies Track
