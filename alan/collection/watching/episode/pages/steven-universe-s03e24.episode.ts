import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS03e24 = {
  id: "01a18855-67ea-7646-aa12-ee5a22ea3399",
  type: "page-type/episode",
  slug: "steven-universe-s03e24",
  description: "Steven gets marooned in his bubble.",
  ownLength: 11,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-3"],
  position: 24,
  publishedAt: "2016-08-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1212918",
      externalLink: "https://www.themoviedb.org/tv/61175/season/3/episode/24",
    },
  ],
  title: "Bubbled",
  episodeType: "finale",
  stillPath: "/uwMeptpzg632sMLEoT64gukn8pg.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
