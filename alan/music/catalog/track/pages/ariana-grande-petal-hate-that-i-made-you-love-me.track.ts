import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalHateThatIMadeYouLoveMe = {
  id: "01a0a6c5-0408-7f2e-ae17-64674b8e956e",
  type: "page-type/track",
  slug: "ariana-grande-petal-hate-that-i-made-you-love-me",
  ownLength: 3.29915,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-petal"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3iy2QuCtCzpWnR6tia39AB",
      externalLink: "https://open.spotify.com/track/3iy2QuCtCzpWnR6tia39AB",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "hate that i made you love me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "hatethatimadeyouloveme|66CXWjxzNUsdJxJ2JdwvnR|197949",
  song: "song/ariana-grande-hate-that-i-made-you-love-me",
} as const satisfies Track
