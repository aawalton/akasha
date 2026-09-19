import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlINeedLove = {
  id: "01a0aa7c-3110-776f-ac9c-6ad7b6ecece3",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-i-need-love",
  ownLength: 3.0357166666666666,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "57CcOoiBg93ozKpIWEnceR",
      externalLink: "https://open.spotify.com/track/57CcOoiBg93ozKpIWEnceR",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "I Need Love",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "ineedlove|1Xylc3o4UrD53lo9CvFvVg|182143",
  song: "song/zara-larsson-i-need-love",
} as const satisfies Track
