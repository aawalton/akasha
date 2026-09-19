import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlStickWithYou = {
  id: "01a0aa7c-3193-7357-a87d-c80242a7fec4",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-stick-with-you",
  ownLength: 2.9917,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0wXyiZkKXFHwPAGF0LuoVV",
      externalLink: "https://open.spotify.com/track/0wXyiZkKXFHwPAGF0LuoVV",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Stick With You",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "stickwithyou|1Xylc3o4UrD53lo9CvFvVg|179502",
  song: "song/zara-larsson-stick-with-you",
} as const satisfies Track
