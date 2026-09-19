import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePutYourHeartsUpPutYourHeartsUp = {
  id: "01a0a6c5-3e97-75b6-9d01-c910281bbdfe",
  type: "page-type/track",
  slug: "ariana-grande-put-your-hearts-up-put-your-hearts-up",
  ownLength: 3.5033333333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-put-your-hearts-up"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Rp8zCRpkHyEDqaUczfMZA",
      externalLink: "https://open.spotify.com/track/1Rp8zCRpkHyEDqaUczfMZA",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Put Your Hearts Up",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "putyourheartsup|66CXWjxzNUsdJxJ2JdwvnR|210200",
  song: "song/ariana-grande-put-your-hearts-up",
} as const satisfies Track
