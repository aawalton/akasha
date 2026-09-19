import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonLushLifeMidnightSunMidnightSun = {
  id: "01a0aa7c-3635-7697-8e6d-062051edce92",
  type: "page-type/track",
  slug: "zara-larsson-lush-life-midnight-sun-midnight-sun",
  ownLength: 3.1649666666666665,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-lush-life-midnight-sun"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7vU1C0Jph3hIHSeRL4A181",
      externalLink: "https://open.spotify.com/track/7vU1C0Jph3hIHSeRL4A181",
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
