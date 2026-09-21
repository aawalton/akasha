import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunPrettyUgly = {
  id: "01a0aa7c-37c1-72c7-9af5-75bde19b239e",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-pretty-ugly",
  ownLength: 2.6449333333333334,
  ownProgress: 2.6449333333333334,
  partOfCollections: ["release/zara-larsson-midnight-sun"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3H0lXqOT1AgEX6E6kDDPex",
      externalLink: "https://open.spotify.com/track/3H0lXqOT1AgEX6E6kDDPex",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Pretty Ugly",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "prettyugly|1Xylc3o4UrD53lo9CvFvVg|158696",
  song: "song/zara-larsson-pretty-ugly",
  carriedBy: [
    {
      release: "release/zara-larsson-midnight-sun",
      discNumber: 1,
      position: 2,
      externalId: "3H0lXqOT1AgEX6E6kDDPex",
      externalLink: "https://open.spotify.com/track/3H0lXqOT1AgEX6E6kDDPex",
    },
  ],
} as const satisfies Track
