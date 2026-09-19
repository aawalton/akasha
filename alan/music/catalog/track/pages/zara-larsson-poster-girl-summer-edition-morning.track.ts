import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlSummerEditionMorning = {
  id: "01a0aa7c-2ef8-712b-b073-c2d7b81c83ea",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-summer-edition-morning",
  ownLength: 2.9165666666666668,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl-summer-edition"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3YlDIGeJwj63vf95TW06WQ",
      externalLink: "https://open.spotify.com/track/3YlDIGeJwj63vf95TW06WQ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Morning",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "morning|1Xylc3o4UrD53lo9CvFvVg|174994",
  song: "song/zara-larsson-morning",
} as const satisfies Track
