import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalHateThatIMadeYouLoveMe = {
  id: "01a0a6c5-0408-7f2e-ae17-64674b8e956e",
  type: "page-type/track",
  slug: "ariana-grande-petal-hate-that-i-made-you-love-me",
  grade: "S",
  ownLength: 3.29915,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-petal"],
  status: "not-started",
  unit: "unit/minutes",
  title: "hate that i made you love me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "hatethatimadeyouloveme|66CXWjxzNUsdJxJ2JdwvnR|197949",
  song: "song/ariana-grande-hate-that-i-made-you-love-me",
  carriedBy: [
    {
      release: "release/ariana-grande-petal",
      discNumber: 1,
      position: 2,
      externalId: "3iy2QuCtCzpWnR6tia39AB",
      externalLink: "https://open.spotify.com/track/3iy2QuCtCzpWnR6tia39AB",
    },
  ],
} as const satisfies Track
