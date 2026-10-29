import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS03e01 = {
  id: "01a1884b-3018-7c07-b0c8-12f3127ec951",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s03e01",
  description:
    "The NCIS team partners with several federal agencies to track a sniper who is targeting crowded events in the city. FBI Special Agent Tammy Gregorio arrives to investigate Pride and his team.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-3"],
  position: 1,
  publishedAt: "2016-09-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1224205",
      externalLink: "https://www.themoviedb.org/tv/61387/season/3/episode/1",
    },
  ],
  title: "Aftershocks",
  episodeType: "standard",
  stillPath: "/iNB7zqqYSrUrZg5UnUFtLcZEAOU.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
