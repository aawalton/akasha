import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun3TheAmbition = {
  id: "01a0aa7c-29f0-7a71-92eb-b762ddde55a2",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-3-the-ambition",
  ownLength: 3.5784166666666666,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-3"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0kfVayo9KsW0VWT5Z9Twcw",
      externalLink: "https://open.spotify.com/track/0kfVayo9KsW0VWT5Z9Twcw",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Ambition",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "theambition|1Xylc3o4UrD53lo9CvFvVg|214705",
  song: "song/zara-larsson-the-ambition",
} as const satisfies Track
