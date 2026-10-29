import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS01e02 = {
  id: "01a18843-186f-71a6-8697-71ae279f6649",
  type: "page-type/episode",
  slug: "andor-s01e02",
  description: "Cassian attempts to lay low on Ferrix as agents of the law close in.",
  ownLength: 38,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-1"],
  position: 2,
  publishedAt: "2022-09-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3745185",
      externalLink: "https://www.themoviedb.org/tv/83867/season/1/episode/2",
    },
  ],
  title: "That Would Be Me",
  episodeType: "standard",
  stillPath: "/whihcfB2dZ0PEZC1bzux56B09pK.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
