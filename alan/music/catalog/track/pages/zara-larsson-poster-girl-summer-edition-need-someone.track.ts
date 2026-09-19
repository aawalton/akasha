import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlSummerEditionNeedSomeone = {
  id: "01a0aa7c-2d79-7dea-a559-52733a526922",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-summer-edition-need-someone",
  ownLength: 2.9560166666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl-summer-edition"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5BR5QHwhW0FXdRj0OfYljZ",
      externalLink: "https://open.spotify.com/track/5BR5QHwhW0FXdRj0OfYljZ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Need Someone",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "needsomeone|1Xylc3o4UrD53lo9CvFvVg|177361",
  song: "song/zara-larsson-need-someone",
} as const satisfies Track
