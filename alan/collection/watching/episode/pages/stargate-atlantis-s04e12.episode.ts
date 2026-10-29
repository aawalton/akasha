import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS04e12 = {
  id: "01a18854-82d3-7f12-8b08-45a1a431aa78",
  type: "page-type/episode",
  slug: "stargate-atlantis-s04e12",
  description:
    "The team finds their former Wraith ally's hive ship drifting in space, which leads them to a secret project that could turn the tide of a civil war.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-4"],
  position: 12,
  publishedAt: "2008-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168534",
      externalLink: "https://www.themoviedb.org/tv/2290/season/4/episode/12",
    },
  ],
  title: "Spoils of War",
  episodeType: "standard",
  stillPath: "/qLDHzeTW0fXkujY6Ozgh4OCc5hZ.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
