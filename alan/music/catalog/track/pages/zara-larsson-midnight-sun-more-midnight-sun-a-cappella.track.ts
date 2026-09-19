import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunMoreMidnightSunACappella = {
  id: "01a0aa7c-2691-72ff-b36a-d586969135c1",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-more-midnight-sun-a-cappella",
  ownLength: 2.94715,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-more"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "30GjtBsqQTrVtpn95Zfkxe",
      externalLink: "https://open.spotify.com/track/30GjtBsqQTrVtpn95Zfkxe",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Midnight Sun - A Cappella",
  trackType: "a-cappella",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "midnightsunacappella|1Xylc3o4UrD53lo9CvFvVg|176829",
  song: "song/zara-larsson-midnight-sun",
} as const satisfies Track
