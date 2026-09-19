import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunGirlsTripTheAmbition = {
  id: "01a0aa7c-2283-7455-8235-b2a52b91b364",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-girls-trip-the-ambition",
  ownLength: 3.5784166666666666,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-girls-trip"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3KzE1qTzvwXM3WO1NQX5VN",
      externalLink: "https://open.spotify.com/track/3KzE1qTzvwXM3WO1NQX5VN",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Ambition",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "theambition|1Xylc3o4UrD53lo9CvFvVg|214705",
  song: "song/zara-larsson-the-ambition",
} as const satisfies Track
