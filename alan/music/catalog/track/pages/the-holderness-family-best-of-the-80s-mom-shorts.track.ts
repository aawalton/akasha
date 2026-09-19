import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe80sMomShorts = {
  id: "01a0b4c6-cf94-74de-8490-87d40fc379b9",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-80s-mom-shorts",
  ownLength: 2.031,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-80s"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Ozf0TelTxLG3WrMkkubfP",
      externalLink: "https://open.spotify.com/track/1Ozf0TelTxLG3WrMkkubfP",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Mom Shorts",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "momshorts|6tITG4T8LpC0msapZ4wXGA|121860",
  song: "song/the-holderness-family-mom-shorts",
} as const satisfies Track
