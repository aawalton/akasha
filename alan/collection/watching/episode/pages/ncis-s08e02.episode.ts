import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e02 = {
  id: "01a1884b-ef6c-761f-a9b6-f9cc57deeb16",
  type: "page-type/episode",
  slug: "ncis-s08e02",
  description:
    "The NCIS team has to find a young girl that was kidnapped, but their investigation turns into something else when her grandfather gets way too involved.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 2,
  publishedAt: "2010-09-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334568",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/2",
    },
  ],
  title: "Worst Nightmare",
  episodeType: "standard",
  stillPath: "/pOsd7hK0EIG5VZhVfNppv58ZpAi.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
