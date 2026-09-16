import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunMoreMidnightSun = {
  id: "01a0aa7c-264c-75af-a8bf-2de4200b261e",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-more-midnight-sun",
  ownLength: 3.1649666666666665,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-more"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4a4vH9RgfzwwmuCNPrrOeh",
      externalLink: "https://open.spotify.com/track/4a4vH9RgfzwwmuCNPrrOeh",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Midnight Sun",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "midnightsun|1Xylc3o4UrD53lo9CvFvVg|189898",
} as const satisfies Track
