import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackButlerS03e04 = {
  id: "01a183d8-99a7-7e75-ab6e-bd456861135c",
  type: "page-type/episode",
  slug: "black-butler-s03e04",
  description:
    "Sebastian and Ciel have done undercover work before, but this particular job presents some unique challenges.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-butler-season-3"],
  position: 4,
  publishedAt: "2014-08-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "997389",
      externalLink: "https://www.themoviedb.org/tv/50712/season/3/episode/4",
    },
  ],
  title: "His Butler, Colleague",
  episodeType: "standard",
  stillPath: "/tXVNuJIUyBCZsEGEFr2e0OQKfBY.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T18:49:32.837Z",
} as const satisfies Episode
