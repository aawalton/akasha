import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioCatalystTrustIssues = {
  id: "01a0c622-2346-71dc-ba51-34574d7c88da",
  type: "page-type/track",
  slug: "jessica-baio-catalyst-trust-issues",
  ownLength: 2.2377,
  ownProgress: 0,
  partOfCollections: ["release/jessica-baio-catalyst", "release/jessica-baio-trust-issues"],
  status: "not-started",
  unit: "unit/minutes",
  title: "trust issues",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "trustissues|0VMFTqmv0hYlWruyBERT95|134262",
  song: "song/jessica-baio-trust-issues",
  carriedBy: [
    {
      release: "release/jessica-baio-catalyst",
      discNumber: 1,
      position: 4,
      externalId: "2Mg90m4xDJBdG4vx5Ml2tk",
      externalLink: "https://open.spotify.com/track/2Mg90m4xDJBdG4vx5Ml2tk",
    },
    {
      release: "release/jessica-baio-trust-issues",
      discNumber: 1,
      position: 1,
      externalId: "7Ey31I9piNeyUNVEJVYEzl",
      externalLink: "https://open.spotify.com/track/7Ey31I9piNeyUNVEJVYEzl",
    },
  ],
} as const satisfies Track
