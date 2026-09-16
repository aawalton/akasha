import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusNothing = {
  id: "01a0aa7c-2b6e-72ab-8aea-697e80592b65",
  type: "page-type/track",
  slug: "zara-larsson-venus-nothing",
  ownLength: 2.790766666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-venus"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Ad5NnoiNqgo21DAowasAO",
      externalLink: "https://open.spotify.com/track/0Ad5NnoiNqgo21DAowasAO",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Nothing",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "nothing|1Xylc3o4UrD53lo9CvFvVg|167446",
} as const satisfies Track
