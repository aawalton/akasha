import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e11 = {
  id: "01a1884b-ef72-7866-8c22-2c39e1fe5af9",
  type: "page-type/episode",
  slug: "ncis-s12e11",
  description:
    "The NCIS team investigates copy-cat crime scenes while Gibbs navigates two ex-wives relentlessly trying to get his attention.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 11,
  publishedAt: "2015-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1025462",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/11",
    },
  ],
  title: "Check",
  episodeType: "standard",
  stillPath: "/jixsKT6h1FiQdhBlySoFcRxGcuE.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
