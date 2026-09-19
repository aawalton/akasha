import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlSummerEditionINeedLove = {
  id: "01a0aa7c-2e0b-7b07-9365-d4e8c11c982b",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-summer-edition-i-need-love",
  ownLength: 3.0357166666666666,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl-summer-edition"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2sHO6TNbkIYXRHfcPJaaAh",
      externalLink: "https://open.spotify.com/track/2sHO6TNbkIYXRHfcPJaaAh",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "I Need Love",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "ineedlove|1Xylc3o4UrD53lo9CvFvVg|182143",
  song: "song/zara-larsson-i-need-love",
} as const satisfies Track
