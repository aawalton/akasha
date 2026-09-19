import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun2MidnightSun = {
  id: "01a0aa7c-3655-7c3d-9c7f-3a78ebf49109",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-2-midnight-sun",
  ownLength: 3.7682333333333333,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-2"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6q2YSturdfEzMpoUR5gq0R",
      externalLink: "https://open.spotify.com/track/6q2YSturdfEzMpoUR5gq0R",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Midnight Sun",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "7tjVFCxJdwT4NdrTmjyjQ6", artistName: "Muni Long" },
  ],
  trackKey: "midnightsun|1Xylc3o4UrD53lo9CvFvVg,7tjVFCxJdwT4NdrTmjyjQ6|226094",
  song: "song/zara-larsson-midnight-sun",
} as const satisfies Track
