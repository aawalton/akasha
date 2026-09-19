import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunGirlsTripEurosummer = {
  id: "01a0aa7c-2241-7ad2-b489-7229acc2028e",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-girls-trip-eurosummer",
  ownLength: 2.881066666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-girls-trip"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5k8ciXff4wO0OtQOnN8NEg",
      externalLink: "https://open.spotify.com/track/5k8ciXff4wO0OtQOnN8NEg",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Eurosummer",
  trackType: "studio",
  discNumber: 2,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "eurosummer|1Xylc3o4UrD53lo9CvFvVg|172864",
  song: "song/zara-larsson-euro-summer",
} as const satisfies Track
