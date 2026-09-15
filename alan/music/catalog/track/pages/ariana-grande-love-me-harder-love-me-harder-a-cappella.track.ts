import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeLoveMeHarderLoveMeHarderACappella = {
  id: "01a0a6c5-3c4b-7383-844b-7f48460bdefc",
  type: "page-type/track",
  slug: "ariana-grande-love-me-harder-love-me-harder-a-cappella",
  ownLength: 3.8943833333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-love-me-harder"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "071IQ2wufBbCpB95z7VU7i",
      externalLink: "https://open.spotify.com/track/071IQ2wufBbCpB95z7VU7i",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Love Me Harder - A Cappella",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "1Xyo4u8uXC1ZmMpatF05PJ", artistName: "The Weeknd" },
  ],
  trackKey: "lovemeharderacappella|1Xyo4u8uXC1ZmMpatF05PJ,66CXWjxzNUsdJxJ2JdwvnR|233663",
} as const satisfies Track
