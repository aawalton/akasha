import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunMidnightSun = {
  id: "01a0aa7c-379c-750e-b7f2-7f5643ef4c9a",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-midnight-sun",
  ownLength: 3.1649666666666665,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "37UCSVSqiPGdR1DijOFyYY",
      externalLink: "https://open.spotify.com/track/37UCSVSqiPGdR1DijOFyYY",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Midnight Sun",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "midnightsun|1Xylc3o4UrD53lo9CvFvVg|189898",
  song: "song/zara-larsson-midnight-sun",
} as const satisfies Track
