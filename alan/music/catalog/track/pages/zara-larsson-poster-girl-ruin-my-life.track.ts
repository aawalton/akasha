import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlRuinMyLife = {
  id: "01a0aa7c-3167-7b04-8d8f-d1ed0d374576",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-ruin-my-life",
  ownLength: 3.1675166666666668,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4nyY8oVjbX2d4qzlpiVM5n",
      externalLink: "https://open.spotify.com/track/4nyY8oVjbX2d4qzlpiVM5n",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ruin My Life",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "ruinmylife|1Xylc3o4UrD53lo9CvFvVg|190051",
  song: "song/zara-larsson-ruin-my-life",
} as const satisfies Track
