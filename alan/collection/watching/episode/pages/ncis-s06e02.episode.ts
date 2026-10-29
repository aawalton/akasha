import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e02 = {
  id: "01a1884b-ef68-718c-97e5-4c4d24429351",
  type: "page-type/episode",
  slug: "ncis-s06e02",
  description:
    "DiNozzo's investigation into a Navy Lieutenant's apparent suicide takes a surprising and deadly turn when it seems that it might have a connection to a larger, deadly scheme.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 2,
  publishedAt: "2008-09-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334429",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/2",
    },
  ],
  title: "Agent Afloat",
  episodeType: "standard",
  stillPath: "/9X7kvMzP43607TTPiuF9I1browe.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
