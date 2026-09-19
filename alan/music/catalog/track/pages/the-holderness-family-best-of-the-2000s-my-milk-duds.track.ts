import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe2000sMyMilkDuds = {
  id: "01a0b4c6-cdb5-7cfd-96b4-ec136b27fffd",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-2000s-my-milk-duds",
  ownLength: 1.122,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-2000s"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "05YUsvsElWNtUi22qCefPW",
      externalLink: "https://open.spotify.com/track/05YUsvsElWNtUi22qCefPW",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "My Milk Duds",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "mymilkduds|6tITG4T8LpC0msapZ4wXGA|67320",
  song: "song/the-holderness-family-my-milk-duds",
} as const satisfies Track
