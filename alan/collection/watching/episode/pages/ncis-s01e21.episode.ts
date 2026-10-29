import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e21 = {
  id: "01a1884b-ef63-7c2c-96e7-deda04b20627",
  type: "page-type/episode",
  slug: "ncis-s01e21",
  description:
    "When a body of a murdered Marine is found in the forest, the investigation leads to the local militia and a weapon deal gone wrong.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 21,
  publishedAt: "2004-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334450",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/21",
    },
  ],
  title: "Split Decision",
  episodeType: "standard",
  stillPath: "/5YaHqerTeq7yuXm1zVJQFpdMUVT.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
