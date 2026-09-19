import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlWow = {
  id: "01a0aa7c-30bc-7bd7-bb46-aba86874e947",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-wow",
  ownLength: 2.98485,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7Hl6ugkpaxbkseHzSnqlxB",
      externalLink: "https://open.spotify.com/track/7Hl6ugkpaxbkseHzSnqlxB",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "WOW",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "wow|1Xylc3o4UrD53lo9CvFvVg|179091",
  song: "song/zara-larsson-wow",
} as const satisfies Track
