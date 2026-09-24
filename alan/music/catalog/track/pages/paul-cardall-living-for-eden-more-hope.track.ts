import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenMoreHope = {
  id: "01a0b4c8-4bc7-7ddf-9918-8c537d4c907f",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-more-hope",
  ownLength: 2.854433333333333,
  ownProgress: 2.854433333333333,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "More Hope",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "morehope|7FQRbf8gbKw8KZQZAJWxH2|171266",
  song: "song/paul-cardall-more-hope",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 19,
      externalId: "3XO8BHtCOObbWlmT1WERxl",
      externalLink: "https://open.spotify.com/track/3XO8BHtCOObbWlmT1WERxl",
    },
  ],
} as const satisfies Track
