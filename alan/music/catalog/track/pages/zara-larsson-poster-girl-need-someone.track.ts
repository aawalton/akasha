import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlNeedSomeone = {
  id: "01a0aa7c-306c-7a0b-becd-a1c3c4d840d9",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-need-someone",
  ownLength: 2.9560166666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2rXH6dk75hFUjg81BMJYFD",
      externalLink: "https://open.spotify.com/track/2rXH6dk75hFUjg81BMJYFD",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Need Someone",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "needsomeone|1Xylc3o4UrD53lo9CvFvVg|177361",
} as const satisfies Track
