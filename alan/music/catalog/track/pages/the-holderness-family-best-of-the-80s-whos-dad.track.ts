import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOfThe80sWhosDad = {
  id: "01a0b4c6-cf74-7fa6-8924-08dc95205fe6",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-the-80s-whos-dad",
  ownLength: 2.0610333333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-the-80s"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7nL9bbnt55XuJp2A5VA1QH",
      externalLink: "https://open.spotify.com/track/7nL9bbnt55XuJp2A5VA1QH",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Who's Dad?",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "whosdad|6tITG4T8LpC0msapZ4wXGA|123662",
  song: "song/the-holderness-family-whos-dad",
} as const satisfies Track
