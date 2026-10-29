import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS21e09 = {
  id: "01a1884b-ef83-7eaf-83ac-441b0c319378",
  type: "page-type/episode",
  slug: "ncis-s21e09",
  description:
    "After discovering the remains of a Marine captain, the NCIS team travels to Texas to interrogate the suspected killer.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-21"],
  position: 9,
  publishedAt: "2024-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5276681",
      externalLink: "https://www.themoviedb.org/tv/4614/season/21/episode/9",
    },
  ],
  title: "Prime Cut",
  episodeType: "standard",
  stillPath: "/4N0LNnmCLHFxvqZFrMdFsMqodFW.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
