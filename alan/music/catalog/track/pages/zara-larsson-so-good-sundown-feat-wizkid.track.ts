import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodSundownFeatWizkid = {
  id: "01a0aa7c-3315-7532-8d21-4ec552a58b2b",
  type: "page-type/track",
  slug: "zara-larsson-so-good-sundown-feat-wizkid",
  ownLength: 3.429666666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-so-good"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1yQ8woSt5tJ7pGJyQGuc2q",
      externalLink: "https://open.spotify.com/track/1yQ8woSt5tJ7pGJyQGuc2q",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Sundown (feat. Wizkid)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "3tVQdUvClmAT7URs9V3rsp", artistName: "Wizkid" },
  ],
  trackKey: "sundownfeatwizkid|1Xylc3o4UrD53lo9CvFvVg,3tVQdUvClmAT7URs9V3rsp|205780",
  song: "song/zara-larsson-sundown",
} as const satisfies Track
