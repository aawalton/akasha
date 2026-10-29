import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS04e05 = {
  id: "01a18854-82d2-7ed4-b033-86c50bcc9810",
  type: "page-type/episode",
  slug: "stargate-atlantis-s04e05",
  description:
    "Colonel Sheppard is captured by the inhabitants of a generational ship and their beautiful leader, who wish to use his ability to use Ancient technology for their own ends.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-4"],
  position: 5,
  publishedAt: "2007-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168526",
      externalLink: "https://www.themoviedb.org/tv/2290/season/4/episode/5",
    },
  ],
  title: "Travelers",
  episodeType: "standard",
  stillPath: "/sERwvvd0uTpx2WPXWlPSoacdSjO.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
