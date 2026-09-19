import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlSummerEditionINeedLoveFeatTrevorDaniel = {
  id: "01a0aa7c-2ff9-7d7f-8285-b25e9544890a",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-summer-edition-i-need-love-feat-trevor-daniel",
  ownLength: 3.1068,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl-summer-edition"],
  position: 20,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6t0nlLzuahyBab1sYqfOGG",
      externalLink: "https://open.spotify.com/track/6t0nlLzuahyBab1sYqfOGG",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "I Need Love (feat. Trevor Daniel)",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "7uaIm6Pw7xplS8Dy06V6pT", artistName: "Trevor Daniel" },
  ],
  trackKey: "ineedlovefeattrevordaniel|1Xylc3o4UrD53lo9CvFvVg,7uaIm6Pw7xplS8Dy06V6pT|186408",
  song: "song/zara-larsson-i-need-love",
} as const satisfies Track
