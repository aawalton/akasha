import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e02 = {
  id: "01a1884b-ef73-7a64-9e34-13e891404ae5",
  type: "page-type/episode",
  slug: "ncis-s13e02",
  description:
    "Gibbs calls on the team to assist DEA Agent Luis Mitchell with a case that keeps going cold, but DiNozzo discovers there is more to Gibbs’ personal connection to the agent and his desire to help him succeed.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 2,
  publishedAt: "2015-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1105380",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/2",
    },
  ],
  title: "Personal Day",
  episodeType: "standard",
  stillPath: "/5MQkfVOuHhdXkJB1g0RuAYGvTCA.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
