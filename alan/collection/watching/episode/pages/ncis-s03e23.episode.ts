import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e23 = {
  id: "01a1884b-ef66-79d8-887f-dbbf37e013b8",
  type: "page-type/episode",
  slug: "ncis-s03e23",
  description:
    "While working on an assignment, Gibbs is seriously injured in an explosion, and taken to a hospital, where he recalls his painful past, which he has always hidden from others. The rest of the team must proceed with the investigation and put their feelings towards Gibbs' injury aside.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 23,
  publishedAt: "2006-05-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334540",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/23",
    },
  ],
  title: "Hiatus (1)",
  episodeType: "standard",
  stillPath: "/3iZHPoLecbCkX6NRHRW5II9Ht76.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
