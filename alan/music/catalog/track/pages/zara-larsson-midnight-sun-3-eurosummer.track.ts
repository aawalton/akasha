import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun3Eurosummer = {
  id: "01a0aa7c-29a6-7a0e-9366-174a2ea32f11",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-3-eurosummer",
  ownLength: 2.881066666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-3"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2EhJHJV7itLmFGH1CQoK3i",
      externalLink: "https://open.spotify.com/track/2EhJHJV7itLmFGH1CQoK3i",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Eurosummer",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "eurosummer|1Xylc3o4UrD53lo9CvFvVg|172864",
  song: "song/zara-larsson-euro-summer",
} as const satisfies Track
