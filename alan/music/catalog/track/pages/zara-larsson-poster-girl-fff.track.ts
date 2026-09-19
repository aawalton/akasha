import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlFff = {
  id: "01a0aa7c-31c1-78cf-ab08-800032dd7c54",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-fff",
  ownLength: 3.5430166666666665,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3zi1freHC2SBhhlzvH368W",
      externalLink: "https://open.spotify.com/track/3zi1freHC2SBhhlzvH368W",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "FFF",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "fff|1Xylc3o4UrD53lo9CvFvVg|212581",
  song: "song/zara-larsson-fff",
} as const satisfies Track
